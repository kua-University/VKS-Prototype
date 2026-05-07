import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

// ==================== COMPLETE TRANSLATIONS (NO ENGLISH) ====================
const translations = {
    am: {
        appTitle: 'የመንደር እውቀት ሥርዓት',
        report: 'ሪፖርት',
        feed: 'ምግብ',
        sync: 'ማመሳሰል',
        pressAndHold: 'ችግርዎን ለመቅዳት ተጭነው ይያዙ',
        recording: 'በመቅዳት ላይ... ለማቆም ይልቀቁ',
        voiceProblem: 'የድምጽ ችግር',
        problemReported: 'ችግር ተዘግቧል',
        submit: 'አስገባ',
        selectCategory: 'ምድብ ይምረጡ',
        textAlternative: 'በጽሁፍ ሪፖርት ማድረግ',
        typeProblem: 'ችግርዎን ይግለጹ...',
        answers: 'መልሶች',
        addAnswer: 'መልስ ያክሉ',
        postAnswer: 'መልስ ለጥፍ',
        cancel: 'ሰርዝ',
        verified: 'የተረጋገጠ',
        syncNow: 'አሁን አመሳስል',
        exportUSB: 'ወደ ዩኤስቢ ላክ',
        championMode: 'ሻምፒዮን ሁነታ',
        villagerMode: 'መንደርኛ ሁነታ',
        pendingSync: 'ማመሳሰል በመጠበቅ ላይ',
        allSynced: 'ሁሉም ተመሳስሏል',
        noProblems: 'ምንም ችግሮች አልተገኙም',
        settings: 'ቅንብሮች',
        championTools: 'የሻምፒዮን መሳሪያዎች',
        searchLibrary: 'መጽሐፍት ውስጥ ፈልግ',
        readAloud: 'ጮህ አንብብ',
        characterLimit: 'ቁምፊዎች',
        confirmDelete: 'ሁሉንም ውሂብ መሰረዝ እንደሚፈልጉ እርግጠኛ ነዎት?',
        problem: 'ችግር',
        reportedBy: 'የተዘገበው በ',
        crop: 'ሰብል',
        animal: 'እንስሳ',
        health: 'ጤና',
        water: 'ውሃ',
        market: 'ገበያ',
        weather: 'አየር'
    },
    or: {
        appTitle: 'Sistema Beekumsa Ganda',
        report: 'Gabaasa',
        feed: 'Soorata',
        sync: 'Waliin Makuu',
        pressAndHold: 'Rakkina keessan galmeessuuf dhidhiibaa qabadhaa',
        recording: 'Galmeessaa... Gatabsuu',
        voiceProblem: 'Rakkina Sagalee',
        problemReported: 'Rakkiin gabaasame',
        submit: 'Ergi',
        selectCategory: 'Ramaddii filadhu',
        textAlternative: 'Gabaasa barreeffamaan',
        typeProblem: 'Rakkina keessan ibsaa...',
        answers: 'Deebii',
        addAnswer: 'Deebii dabali',
        postAnswer: 'Deebisi',
        cancel: 'Haqi',
        verified: 'Mirkanaa\'e',
        syncNow: 'Amma waliin maki',
        exportUSB: 'USB ergi',
        championMode: 'Haala Abbaa Abeerraa',
        villagerMode: 'Haala Ganda',
        pendingSync: 'Waliin makuuf eeggachaa',
        allSynced: 'Hunduu waliin makame',
        noProblems: 'Rakkini hin jiru',
        settings: 'Qindeessaa',
        championTools: 'Meela Abbaa Abeerraa',
        searchLibrary: 'Galmee kitaabaa keessatti barbaadi',
        readAloud: 'Sagaleessaan dubbisi',
        characterLimit: 'Arfii',
        confirmDelete: 'Daataa hunda haquu akka barbaaddu mirkaneeffatte?',
        problem: 'Rakkina',
        reportedBy: 'Gabaase',
        crop: 'Midhaan',
        animal: 'Bineelda',
        health: 'Fayyaa',
        water: 'Bishaan',
        market: 'Gabaa',
        weather: 'Qilleensa'
    },
    ti: {
        appTitle: 'ስርዓተ ፍልጠት ቀበላ',
        report: 'ሕታም',
        feed: 'ምግቢ',
        sync: 'ምስምማዕ',
        pressAndHold: 'ችግርኩም ንምቅዳሕ ጠዚቕኩም ሐዝዎ',
        recording: 'ይቐድሕ ኣሎ... ንምውዳእ ሓዲግኩምዎ',
        voiceProblem: 'ችግር ድምጺ',
        problemReported: 'ችግር ሕቲሙ',
        submit: 'ኣቅርብ',
        selectCategory: 'ምድብ ምረጹ',
        textAlternative: 'ብጽሑፍ ሕታም',
        typeProblem: 'ችግርኩም ግለጹ...',
        answers: 'መልሲ',
        addAnswer: 'መልሲ ውስኹ',
        postAnswer: 'መልሲ ልጠፍ',
        cancel: 'ኣትርፉ',
        verified: 'ተረጋጊጹ',
        syncNow: 'ሕጂ ኣመሳስል',
        exportUSB: 'ናብ ዩኤስቢ ሰደድ',
        championMode: 'ኩነተ ሻምፕዮን',
        villagerMode: 'ኩነተ ቀበላ',
        pendingSync: 'ምስምማዕ ይጽበ ኣሎ',
        allSynced: 'ኩሉ ተመሲሱ',
        noProblems: 'ችግራት የለን',
        settings: 'ምድላውታ',
        championTools: 'መሳርሒታት ሻምፕዮን',
        searchLibrary: 'ኣብ መጻሕፍቲ ድለዩ',
        readAloud: 'ብድምጺ ኣንብብ',
        characterLimit: 'ጹራፍ',
        confirmDelete: 'ኩሉ ዳታ ምምራዝኩም ወሲኹም ዲኹም?',
        problem: 'ችግር',
        reportedBy: 'ሒቲሙ',
        crop: 'ብርዒ',
        animal: 'እንስሳ',
        health: 'ጥዕና',
        water: 'ማይ',
        market: 'ዓዳ',
        weather: 'ኩነታት ኣየር'
    }
};

function getDeviceId() {
    let id = localStorage.getItem('deviceId');
    if (!id) {
        id = 'device_' + Math.random().toString(36).substr(2, 10);
        localStorage.setItem('deviceId', id);
    }
    return id;
}

const categories = [
    { id: 'crop', am: 'ሰብል', or: 'Midhaan', ti: 'ብርዒ' },
    { id: 'animal', am: 'እንስሳ', or: 'Bineelda', ti: 'እንስሳ' },
    { id: 'health', am: 'ጤና', or: 'Fayyaa', ti: 'ጥዕና' },
    { id: 'water', am: 'ውሃ', or: 'Bishaan', ti: 'ማይ' },
    { id: 'market', am: 'ገበያ', or: 'Gabaa', ti: 'ዓዳ' },
    { id: 'weather', am: 'አየር', or: 'Qilleensa', ti: 'ኩነታት ኣየር' }
];

const libraryArticles = [
    { id: 1, amTitle: 'የጤፍ በሽታ ሕክምና', orTitle: 'Walalgaa Dhukkuba Qamadii', tiTitle: 'ሕክምና ሕማም ጣፍ',
      amContent: 'በየ7 ቀን የሎሚ ድኝ መርዝ ይረጩ። የበሽታ ቅጠሎችን ወዲያውኑ ያስወግዱ።',
      orContent: 'Guyyaa 7 keessatti sumni qandhalaa bubuteessi. Baala dhukkubsate yeroo yeroodhaan baleessi.',
      tiContent: 'ብዕሽተ መዓልቲ 7 መርዚ ሎሚ ርጽፉ። ቈጽሊ ሕሙማት ብቕልጡፍ ኣውጽእዎ።' },
    { id: 2, amTitle: 'የላም ተቅማጥ ሕክምና', orTitle: 'Walalgaa Korma Albaasaa', tiTitle: 'ሕክምና ድርቃይ ላም',
      amContent: 'ንጹህ ውሃ ከአፍ ውስጥ የሚወሰድ ጨው በማደባለቅ ይስጡ። ለ24 ሰዓት ከቀጠለ የእንስሳ ሐኪም ያማክሩ።',
      orContent: 'Bishaan qulqulluu waadaan soogidda afaaniitiin obaasi. Yoo saaatii 24 turte doktor bineeldaa mariisi.',
      tiContent: 'ንጹህ ማይ ምስ ጨው ኣፍ ዚወሰድ ኣዳለዉ ሃብዎ። ን24 ሰዓት እንተ ቀጺሉ ሓኪም እንስሳ ምኽሩ።' }
];

function App() {
    const [activeScreen, setActiveScreen] = useState('home');
    const [problems, setProblems] = useState([]);
    const [unsyncedCount, setUnsyncedCount] = useState(0);
    const [stats, setStats] = useState({ totalProblems: 0, totalAnswers: 0 });
    const [toast, setToast] = useState(null);
    const [language, setLanguage] = useState('am');
    const [formData, setFormData] = useState({ category: 'crop', text: '', voiceBlob: null });
    const [answerText, setAnswerText] = useState('');
    const [selectedProblemId, setSelectedProblemId] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const t = translations[language];
    const deviceId = getDeviceId();
    const isChampion = localStorage.getItem('isChampion') === 'true';
    
    const fetchProblems = async () => {
        try {
            const res = await axios.get(`${API_URL}/problems`);
            if (res.data.success) {
                setProblems(res.data.data);
                const unsynced = res.data.data.filter(p => !p.is_synced).length;
                setUnsyncedCount(unsynced);
            }
        } catch (error) {
            console.error('Error fetching problems:', error);
        }
    };
    
    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/stats`);
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };
    
    useEffect(() => {
        fetchProblems();
        fetchStats();
    }, []);
    
    function showToast(message) {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    }
    
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };
            
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecordedAudio(audioUrl);
                setFormData(prev => ({ ...prev, voiceBlob: audioBlob }));
                showToast(t.recording);
                stream.getTracks().forEach(track => track.stop());
            };
            
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            showToast('የማይክሮፎን መድረስ አልተፈቀደም');
        }
    }
    
    function stopRecording() {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }
    
    function blobToBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }
    
    function speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            const langMap = { am: 'am-ET', or: 'om-ET', ti: 'ti-ET' };
            utterance.lang = langMap[language] || 'am-ET';
            utterance.rate = 0.9;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }
    
    async function submitProblem() {
        if (!formData.text && !formData.voiceBlob) {
            showToast('እባክዎ ድምጽ ወይም ጽሁፍ ያስገቡ');
            return;
        }
        
        setLoading(true);
        let voiceBase64 = null;
        if (formData.voiceBlob) {
            voiceBase64 = await blobToBase64(formData.voiceBlob);
        }
        
        try {
            await axios.post(`${API_URL}/problems`, {
                phone: deviceId,
                category: formData.category,
                text: formData.text,
                voiceBase64: voiceBase64,
                timestamp: Date.now()
            });
            
            setFormData({ category: 'crop', text: '', voiceBlob: null });
            setRecordedAudio(null);
            await fetchProblems();
            await fetchStats();
            setActiveScreen('feed');
            showToast('ችግርዎ በሚገባ ተልኳል!');
        } catch (error) {
            showToast('ችግርዎን ለመላክ አልተቻለም');
        } finally {
            setLoading(false);
        }
    }
    
    async function submitAnswer(problemId) {
        if (!answerText.trim()) {
            showToast('እባክዎ መልስ ይጻፉ');
            return;
        }
        
        setLoading(true);
        try {
            await axios.post(`${API_URL}/answers`, {
                problemId: problemId,
                phone: deviceId,
                text: answerText,
                isChampionVerified: isChampion,
                timestamp: Date.now()
            });
            
            setAnswerText('');
            setSelectedProblemId(null);
            await fetchProblems();
            showToast('መልስዎ ተልኳል!');
        } catch (error) {
            showToast('መልስዎን ለመላክ አልተቻለም');
        } finally {
            setLoading(false);
        }
    }
    
    async function simulateSync() {
        const unsyncedProblems = problems.filter(p => !p.is_synced);
        if (unsyncedProblems.length === 0) {
            showToast('ሁሉም ችግሮች ተመሳስለዋል');
            return;
        }
        
        setLoading(true);
        try {
            const problemIds = unsyncedProblems.map(p => p.problem_id);
            await axios.put(`${API_URL}/sync/mark-synced`, { problemIds });
            await fetchProblems();
            showToast(`${problemIds.length} ችግሮች ተመሳስለዋል`);
        } catch (error) {
            showToast('ማመሳሰል አልተሳካም');
        } finally {
            setLoading(false);
        }
    }
    
    function exportToUSB() {
        const data = {
            problems: problems,
            exportDate: new Date().toISOString(),
            villageCode: 'ETH-OR-012'
        };
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vks_backup_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('ውሂብ ወደ ዩኤስቢ ተልኳል');
    }
    
    function toggleChampionMode() {
        const current = localStorage.getItem('isChampion') === 'true';
        localStorage.setItem('isChampion', (!current).toString());
        showToast(current ? 'የሻምፒዮን ሁነታ ጠፍቷል' : 'የሻምፒዮን ሁነታ በርቷል');
        fetchProblems();
    }
    
    function getCategoryName(catId) {
        const cat = categories.find(c => c.id === catId);
        if (language === 'am') return cat.am;
        if (language === 'or') return cat.or;
        return cat.ti;
    }
    
    const filteredLibrary = libraryArticles.filter(article => {
        const title = language === 'am' ? article.amTitle : language === 'or' ? article.orTitle : article.tiTitle;
        return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    const renderHome = () => (
        <div>
            <div className="voice-button">
                <button 
                    className={`mic-btn ${isRecording ? 'recording' : ''}`}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                >
                    🎤
                </button>
                <p className="instruction">{isRecording ? t.recording : t.pressAndHold}</p>
                {recordedAudio && (
                    <div style={{ marginTop: 20, textAlign: 'center', width: '100%' }}>
                        <audio controls src={recordedAudio} style={{ width: '100%' }}></audio>
                        <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            style={{ marginTop: 12, padding: 10, width: '100%', borderRadius: 12 }}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{getCategoryName(cat.id)}</option>
                            ))}
                        </select>
                        <button className="btn-primary" onClick={submitProblem} disabled={loading}>{t.submit}</button>
                    </div>
                )}
            </div>
            
            <div className="text-alternative">
                <div className="divider"><span>{t.textAlternative}</span></div>
                <div className="form-group">
                    <textarea 
                        value={formData.text}
                        onChange={(e) => {
                            if (e.target.value.length <= 1000) {
                                setFormData({...formData, text: e.target.value});
                            }
                        }}
                        placeholder={t.typeProblem}
                        maxLength="1000"
                        style={{ width: '100%', minHeight: '100px' }}
                    />
                    <div className="char-counter">{formData.text.length}/1000 {t.characterLimit}</div>
                </div>
                <div className="form-group">
                    <label>{t.selectCategory}</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{getCategoryName(cat.id)}</option>
                        ))}
                    </select>
                </div>
                <button className="btn-primary" onClick={submitProblem} disabled={loading}>{t.submit}</button>
            </div>
            
            <div className="stats-bar">
                <span>📊 {stats.totalProblems} {t.problem}</span>
                <span>💬 {stats.totalAnswers} {t.answers}</span>
                <span>🌐 የኋላ አገልጋይ</span>
            </div>
        </div>
    );
    
    const renderFeed = () => {
        if (problems.length === 0) {
            return (
                <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
                    <span style={{ fontSize: 48 }}>📭</span>
                    <p>{t.noProblems}</p>
                </div>
            );
        }
        
        return problems.map(problem => (
            <div key={problem.id} className="problem-card">
                <div className="problem-category">{getCategoryName(problem.category)}</div>
                <div className="problem-text">{problem.text || (problem.voice_base64 ? '🎤 ' + t.voiceProblem : t.problemReported)}</div>
                <div className="problem-meta">
                    <span>{new Date(problem.timestamp).toLocaleString()}</span>
                    <span>👍 {problem.upvotes || 0}</span>
                    <span>{problem.is_synced ? '✓ ' + t.allSynced : '⏳ ' + t.pendingSync}</span>
                </div>
                {problem.voice_base64 && <audio controls src={problem.voice_base64} style={{ width: '100%', marginTop: 8 }}></audio>}
                
                <div className="answer-section">
                    <strong>💬 {t.answers} ({problem.answers?.length || 0})</strong>
                    {problem.answers?.map(answer => (
                        <div key={answer.id} className="answer-item">
                            <div>{answer.text}</div>
                            <div className="answer-actions">
                                <span className="answer-date">{new Date(answer.timestamp).toLocaleString()}</span>
                                {answer.is_champion_verified && <span className="champion-badge">⭐ {t.verified}</span>}
                                <button className="speak-btn" onClick={() => speakText(answer.text)}>🔊 {t.readAloud}</button>
                            </div>
                        </div>
                    ))}
                    
                    {selectedProblemId === problem.problem_id ? (
                        <div style={{ marginTop: 12 }}>
                            <textarea 
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                placeholder={t.addAnswer}
                                style={{ width: '100%', padding: 10, borderRadius: 12, border: '1px solid #ddd' }}
                                maxLength="1000"
                            />
                            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                <button className="btn-primary" style={{ flex: 1 }} onClick={() => submitAnswer(problem.problem_id)} disabled={loading}>
                                    {t.postAnswer}
                                </button>
                                <button className="btn-secondary" style={{ flex: 1, background: '#ccc' }} onClick={() => setSelectedProblemId(null)}>
                                    {t.cancel}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="add-answer-btn" onClick={() => setSelectedProblemId(problem.problem_id)}>
                            ➕ {t.addAnswer}
                        </button>
                    )}
                </div>
            </div>
        ));
    };
    
    const renderSync = () => (
        <div>
            <div className="sync-panel">
                <h4>📡 {t.syncNow}</h4>
                <div className="sync-stats">
                    <p>📤 {t.pendingSync}: <strong>{unsyncedCount}</strong></p>
                    <p>💾 {t.problem}: <strong>{stats.totalProblems}</strong></p>
                    <p>💬 {t.answers}: <strong>{stats.totalAnswers}</strong></p>
                </div>
                <button className="btn-primary" onClick={simulateSync} disabled={loading}>🔄 {t.syncNow}</button>
            </div>
            
            {isChampion && (
                <div className="sync-panel" style={{ background: '#fff8e1' }}>
                    <h4>⭐ {t.championTools}</h4>
                    <button className="btn-warning" onClick={exportToUSB}>💾 {t.exportUSB}</button>
                    <button className="btn-danger" onClick={() => setShowDeleteConfirm(!showDeleteConfirm)} style={{ marginTop: 10 }}>
                        🗑️ {showDeleteConfirm ? t.confirmDelete : 'ሁሉንም ውሂብ አጽዳ'}
                    </button>
                </div>
            )}
            
            <div className="sync-panel">
                <h4>⚙️ {t.settings}</h4>
                <button className="btn-secondary" onClick={toggleChampionMode}>
                    {isChampion ? `⭐ ${t.championMode}` : `👤 ${t.villagerMode}`}
                </button>
            </div>
            
            <div className="sync-panel">
                <h4>📚 {t.searchLibrary}</h4>
                <input type="text" placeholder={t.searchLibrary} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #ddd', marginBottom: 12 }} />
                {filteredLibrary.map(article => {
                    const title = language === 'am' ? article.amTitle : language === 'or' ? article.orTitle : article.tiTitle;
                    const content = language === 'am' ? article.amContent : language === 'or' ? article.orContent : article.tiContent;
                    return (
                        <div key={article.id} className="library-item">
                            <div className="library-title">{title}</div>
                            <div className="library-content">{content}</div>
                            <button className="speak-btn" onClick={() => speakText(content)}>🔊 {t.readAloud}</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    
    return (
        <div className="app">
            <div className="header">
                <div className="language-selector">
                    <button className={`lang-btn ${language === 'am' ? 'active' : ''}`} onClick={() => setLanguage('am')}>አማርኛ</button>
                    <button className={`lang-btn ${language === 'or' ? 'active' : ''}`} onClick={() => setLanguage('or')}>Oromiffa</button>
                    <button className={`lang-btn ${language === 'ti' ? 'active' : ''}`} onClick={() => setLanguage('ti')}>ትግርኛ</button>
                </div>
                <h1>🌾 VKS</h1>
                <p>{t.appTitle}</p>
            </div>
            
            <div className="sync-status">
                <span>{unsyncedCount > 0 ? `⏳ ${unsyncedCount} ${t.pendingSync}` : `✓ ${t.allSynced}`}</span>
                <span>{isChampion ? `⭐ ${t.championMode}` : `👤 ${t.villagerMode}`}</span>
                <span>🌐 ከኋላ አገልጋይ ጋር</span>
            </div>
            
            <div className="nav-icons">
                <div className={`nav-icon ${activeScreen === 'home' ? 'active' : ''}`} onClick={() => setActiveScreen('home')}>
                    <span>🎤</span><label>{t.report}</label>
                </div>
                <div className={`nav-icon ${activeScreen === 'feed' ? 'active' : ''}`} onClick={() => setActiveScreen('feed')}>
                    <span>👥</span><label>{t.feed}</label>
                </div>
                <div className={`nav-icon ${activeScreen === 'sync' ? 'active' : ''}`} onClick={() => setActiveScreen('sync')}>
                    <span>🔄</span><label>{t.sync}</label>
                </div>
            </div>
            
            <div className="content">
                {activeScreen === 'home' && renderHome()}
                {activeScreen === 'feed' && renderFeed()}
                {activeScreen === 'sync' && renderSync()}
            </div>
            
            {toast && <div className="toast">{toast}</div>}
            {loading && <div className="loading-overlay">⏳ በማቀናበር ላይ...</div>}
        </div>
    );
}

export default App;
