import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Loader2, Edit, Trash2 } from 'lucide-react';

const ManageProjects = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchProjects();
    }
  }, [currentUser]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'projects'),
        where('clientId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(projectId);
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md w-full border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Please log in to manage your projects</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Link to="/login">
              <Button className="covalent-gradient text-white hover:opacity-90">Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <Card className="mb-10 border-2 border-primary/20 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center covalent-text-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
              Manage Your Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-secondary" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                You have not posted any projects yet.
              </div>
            ) : (
              <div className="grid gap-6">
                {projects.map(project => (
                  <Card key={project.id} className="border border-border/60 bg-white/90">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-primary mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {project.title}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">{project.status}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="icon" className="hover:bg-secondary/20" title="Edit">
                          <Link to={`/edit-project/${project.id}`}><Edit className="w-5 h-5" /></Link>
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)} disabled={deletingId === project.id} title="Delete">
                          {deletingId === project.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-base text-foreground mb-2">{project.description}</div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div>Budget: <span className="font-semibold text-primary">${project.budgetMin?.toLocaleString()} - ${project.budgetMax?.toLocaleString()}</span></div>
                        <div>Timeline: <span className="font-semibold text-primary">{project.timeline}</span></div>
                        <div>Experience: <span className="font-semibold text-primary">{project.experienceLevel}</span></div>
                        <div>Created: <span>{new Date(project.createdAt).toLocaleDateString()}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageProjects;