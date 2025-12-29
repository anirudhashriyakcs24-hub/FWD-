import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

type Video = {
  _id: string;
  title: string;
  youtubeUrl: string;
  description: string;
};

type Test = {
  _id: string;
  title: string;
  totalMarks: number;
};

const TopicDetailContent = () => {
  const { topicSlug } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vRes, tRes] = await Promise.all([
          fetch(`http://localhost:5000/api/videos/topic/${topicSlug}`),
          fetch(`http://localhost:5000/api/tests/topic/${topicSlug}`)
        ]);

        setVideos(await vRes.json());
        setTests(await tRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [topicSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">
          Loading topic...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold capitalize mb-6">{topicSlug}</h1>

      {/* VIDEOS */}
<section className="mb-12">
  <h2 className="text-xl font-semibold mb-4">Videos</h2>

  {videos.length === 0 ? (
    <p className="text-muted-foreground">No videos available.</p>
  ) : (
    <div className="space-y-4">
      {videos.map((v) => (
        <div
          key={v._id}
          className="p-4 border rounded-lg bg-card"
        >
          <h3 className="font-medium mb-1">{v.title}</h3>

          <p className="text-sm text-muted-foreground mb-3">
            {v.description}
          </p>

          <a
  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
    v.title
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90"
>
  ▶ Search on YouTube
</a>

        </div>
      ))}
    </div>
  )}
</section>


      {/* TESTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tests</h2>
        {tests.map(t => (
          <div
            key={t._id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-muted"
            onClick={() => navigate(`/tests/${t._id}`)}
          >
            <h3 className="font-medium">{t.title}</h3>
            <p className="text-sm text-muted-foreground">
              {t.totalMarks} marks
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

const TopicDetail = () => (
  <Layout>
    <TopicDetailContent />
  </Layout>
);

export default TopicDetail;
