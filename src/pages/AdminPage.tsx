import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'motion/react';
import { Plus, Trash2, LogOut, LayoutDashboard, Image as ImageIcon, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [designs, setDesigns] = useState<any[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [newDesign, setNewDesign] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Streetwear',
    tags: '',
    isFeatured: false
  });

  useEffect(() => {
    if (isAdmin) {
      fetchDesigns();
    }
  }, [isAdmin]);

  async function fetchDesigns() {
    try {
      const q = query(collection(db, 'designs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setDesigns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFormLoading(true);
    try {
      const path = 'designs';
      const data = {
        ...newDesign,
        tags: newDesign.tags.split(',').map(t => t.trim()).filter(t => t),
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, path), data);
      setNewDesign({
        title: '',
        description: '',
        imageUrl: '',
        category: 'Streetwear',
        tags: '',
        isFeatured: false
      });
      fetchDesigns();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'designs');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteDesign = async (id: string) => {
    if (!confirm('Are you sure you want to delete this design?')) return;
    try {
      await deleteDoc(doc(db, 'designs', id));
      fetchDesigns();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `designs/${id}`);
    }
  };

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function checkEmpty() {
      const snap = await getDocs(collection(db, 'admins'));
      setIsEmpty(snap.empty);
    }
    checkEmpty();
  }, []);

  const bootstrapAdmin = async () => {
    if (!user) return;
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'admins', user.uid), { email: user.email });
      alert('You are now an admin! Please refresh.');
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-on-surface">
        <div className="glass-card p-12 max-w-md w-full text-center">
          <LayoutDashboard className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-on-surface-variant mb-8">
            Please log in with the authorized Google account to manage the portfolio.
          </p>
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:premium-glow transition-all"
          >
            Log In with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-on-surface">
        <div className="glass-card p-12 max-w-md w-full text-center border-red-500/30">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Unauthorized</h1>
          <p className="text-on-surface-variant mb-8">
            Your account ({user.email}) is not authorized for admin access. 
          </p>
          {isEmpty && (
            <button
              onClick={bootstrapAdmin}
              className="w-full bg-green-500/20 text-green-400 py-3 rounded-xl mb-4 border border-green-500/30 font-bold hover:bg-green-500/30 transition-all"
            >
              Set me as First Admin
            </button>
          )}
          <button
            onClick={() => signOut(auth)}
            className="w-full bg-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto text-on-surface">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-4xl font-bold font-metropolis">Admin Dashboard</h1>
          <p className="text-on-surface-variant">Logged in as {user.email}</p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-card p-8 sticky top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Upload New Design
            </h2>
            <form onSubmit={handleCreateDesign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Title</label>
                <input
                  required
                  type="text"
                  value={newDesign.title}
                  onChange={(e) => setNewDesign({ ...newDesign, title: e.target.value })}
                  className="w-full bg-surface-container border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Image URL</label>
                <input
                  required
                  type="url"
                  value={newDesign.imageUrl}
                  placeholder="https://images.unsplash.com/..."
                  onChange={(e) => setNewDesign({ ...newDesign, imageUrl: e.target.value })}
                  className="w-full bg-surface-container border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Category</label>
                  <select
                    value={newDesign.category}
                    onChange={(e) => setNewDesign({ ...newDesign, category: e.target.value })}
                    className="w-full bg-surface-container border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none"
                  >
                    <option>Streetwear</option>
                    <option>Typography</option>
                    <option>Vintage</option>
                    <option>Minimal</option>
                    <option>Oversized</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                   <input 
                    type="checkbox"
                    id="featured"
                    checked={newDesign.isFeatured}
                    onChange={(e) => setNewDesign({ ...newDesign, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-surface-container text-primary"
                   />
                   <label htmlFor="featured" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider cursor-pointer">Featured</label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Description</label>
                <textarea
                  value={newDesign.description}
                  onChange={(e) => setNewDesign({ ...newDesign, description: e.target.value })}
                  className="w-full bg-surface-container border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newDesign.tags}
                  placeholder="modern, blue, graphic"
                  onChange={(e) => setNewDesign({ ...newDesign, tags: e.target.value })}
                  className="w-full bg-surface-container border border-white/10 rounded-lg p-3 text-sm focus:border-primary/50 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:premium-glow transition-all disabled:opacity-50"
              >
                {formLoading ? 'Uploading...' : 'Publish Design'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* List */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
           <div className="glass-card overflow-hidden">
             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-white/5 border-b border-white/10">
                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">Design</th>
                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">Category</th>
                   <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-on-surface-variant">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {designs.map((design) => (
                   <tr key={design.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden">
                           <img src={design.imageUrl} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <div className="font-semibold text-white">{design.title}</div>
                           <div className="text-xs text-on-surface-variant">{design.isFeatured ? '★ Featured' : ''}</div>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <span className="text-xs font-medium text-on-surface-variant">{design.category}</span>
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleDeleteDesign(design.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </td>
                   </tr>
                 ))}
                 {designs.length === 0 && (
                   <tr>
                     <td colSpan={3} className="px-6 py-12 text-center text-on-surface-variant">No designs uploaded yet.</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
