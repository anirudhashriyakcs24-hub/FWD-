import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const TestsContent = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-card rounded-xl shadow-card p-8">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-6">
          Available Tests
        </h1>

        <div className="border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Tests will be loaded from backend APIs in the MERN implementation.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/subjects">
              <Button variant="outline">Browse Subjects</Button>
            </Link>
            <Button onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tests = () => (
  <AuthProvider>
    <Layout>
      <TestsContent />
    </Layout>
  </AuthProvider>
);

export default Tests;
