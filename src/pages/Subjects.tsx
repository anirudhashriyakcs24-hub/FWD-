import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SubjectCard from "@/components/SubjectCard";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

type Subject = {
  _id: string;
  name: string;
  slug: "physics" | "chemistry" | "mathematics";
  description: string;
};

const SubjectsContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // 🔐 Auth guard
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // 📡 Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Failed to load subjects", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">
          Loading subjects...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl font-bold text-foreground mb-8">
        Subjects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <SubjectCard
            key={s._id}
            name={s.name}
            slug={s.slug}
            description={s.description}
          />
        ))}
      </div>
    </div>
  );
};

const Subjects = () => (
  <AuthProvider>
    <Layout>
      <SubjectsContent />
    </Layout>
  </AuthProvider>
);

export default Subjects;
