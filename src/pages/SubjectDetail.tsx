import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import TopicCard from "@/components/TopicCard";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

type Topic = {
  _id: string;
  name: string;
  description: string;
  slug: string;
};

const SubjectDetailContent = () => {
  //const { user, loading } = useAuth();
  //const navigate = useNavigate();
  const { slug } = useParams(); // subject slug

  const [topics, setTopics] = useState<Topic[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  /*useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);
  */
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/topics/subject/${slug}`
        );
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error("Failed to load topics", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchTopics();
  }, [slug]);

/*if (loading) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse text-muted-foreground">
        Checking session...
      </div>
    </div>
  );
}

if (!user) {
  navigate("/auth");
  return null;
}

if (dataLoading) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-pulse text-muted-foreground">
        Loading subjects...
      </div>
    </div>
  );
}
  */


  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-6 capitalize">
        {slug} Topics
      </h1>

      {topics.length === 0 ? (
        <p className="text-muted-foreground">
          No topics available for this subject.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic._id}
              name={topic.name}
              description={topic.description}
              slug={topic.slug}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SubjectDetail = () => (
  <AuthProvider>
    <Layout>
      <SubjectDetailContent />
    </Layout>
  </AuthProvider>
);

export default SubjectDetail;
