
import React, { useState, useEffect } from 'react';
import { INITIAL_IDEAS } from './constants';
import { MarketingIdea } from './types';
import IdeaCard from './components/IdeaCard';
import { generateMarketingIdeas } from './services/geminiService';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<MarketingIdea[]>(INITIAL_IDEAS);
  const [loading, setLoading] = useState(false);
  const [targetAudience, setTargetAudience] = useState('Sinh viên & Nhân viên văn phòng');
  const [tone, setTone] = useState('Hài hước, gần gũi');
  const [extraContext, setExtraContext] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newIdeas = await generateMarketingIdeas(targetAudience, tone, extraContext);
      if (newIdeas && newIdeas.length > 0) {
        setIdeas(newIdeas);
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">TechFix Marketing <span className="text-blue-600">Pro</span></h1>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-slate-500 font-medium">AI-Powered Content Generator</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                Tùy chỉnh nội dung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Đối tượng mục tiêu</label>
                  <input 
                    type="text" 
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    placeholder="VD: Sinh viên, IT, HR..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phong cách (Tone)</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  >
                    <option>Hài hước, gần gũi</option>
                    <option>Chuyên nghiệp, tin cậy</option>
                    <option>Gấp gáp, bùng nổ</option>
                    <option>Kể chuyện (Storytelling)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Yêu cầu thêm (Context)</label>
                  <textarea 
                    value={extraContext}
                    onChange={(e) => setExtraContext(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm h-24"
                    placeholder="VD: Đang mùa thi cử, giảm giá 20%, có trà đá miễn phí..."
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Đang sáng tạo...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Làm mới ý tưởng AI
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Mẹo Marketing</h3>
              <p className="text-sm leading-relaxed text-slate-300 italic">
                "Hãy tập trung vào 'Nỗi đau' của khách hàng. Với sinh viên, đó là rớt môn. Với nhân viên văn phòng, đó là bị sếp phê bình. 'Lấy liền' chính là liều thuốc chữa trị nhanh nhất!"
              </p>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">3 Ý tưởng đề xuất</h2>
              <div className="h-1 flex-grow mx-4 bg-slate-200 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {ideas.map((idea, index) => (
                <div 
                  key={index} 
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500" 
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <IdeaCard idea={idea} />
                </div>
              ))}
            </div>

            {ideas.length === 0 && !loading && (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">Chưa có ý tưởng nào. Hãy nhấn nút "Làm mới" để bắt đầu!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 TechFix Marketing Pro. Crafted for Computer Repair Experts.</p>
      </footer>
    </div>
  );
};

export default App;
