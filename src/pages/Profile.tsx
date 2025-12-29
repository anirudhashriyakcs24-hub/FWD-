import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Award } from "lucide-react";
import Layout from "@/components/Layout";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

type Attempt = {
  _id: string;
  score: number;
  totalMarks: number;
  testTitle: string;
  createdAt: string;
};

const ProfileContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/test-attempts");
        const data = await res.json();
        setAttempts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile */}
      <div className="bg-card rounded-xl shadow-card p-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
  {user?.email?.split("@")[0] || "My Profile"}
</h1>

            <p className="text-muted-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Test History */}
      <div className="bg-card rounded-xl shadow-card p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Test History
        </h2>

        {attempts.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No tests attempted yet.
          </p>
        ) : (
          <div className="space-y-3">
            {attempts.map((a) => (
              <div
                key={a._id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{a.testTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="font-bold">
                  {a.score} / {a.totalMarks}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Profile = () => (
  <AuthProvider>
    <Layout>
      <ProfileContent />
    </Layout>
  </AuthProvider>
);

export default Profile;
