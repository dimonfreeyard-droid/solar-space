import React from 'react';

interface DeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeployGuide: React.FC<DeployGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#0f1029] to-[#0a0a1a] rounded-2xl border border-white/10 shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-gradient-to-b from-[#0f1029] to-transparent">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              🚀 Локальное развёртывание
            </h2>
            <p className="text-white/40 text-sm mt-1">Пошаговая инструкция</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Prerequisites */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">0</span>
              Требования
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/70 text-sm mb-2">Установите <strong className="text-white">Node.js</strong> версии 18 или выше:</p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> node --version
                <br />
                <span className="text-white/30">v18.0.0 или выше</span>
              </div>
              <p className="text-white/50 text-xs mt-2">
                Скачать: <span className="text-blue-400">https://nodejs.org</span>
              </p>
            </div>
          </section>

          {/* Step 1 */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
              Клонируйте / скачайте проект
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/70 text-sm mb-2">Если проект в Git-репозитории:</p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> git clone &lt;url-репозитория&gt;
                <br />
                <span className="text-white/30 mr-2">$</span> cd solar-system
              </div>
              <p className="text-white/50 text-xs mt-2">
                Или просто скачайте ZIP-архив и распакуйте в любую папку.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
              Установите зависимости
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/70 text-sm mb-2">Откройте терминал в папке проекта и выполните:</p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> npm install
              </div>
              <p className="text-white/50 text-xs mt-2">
                Это установит все необходимые пакеты (React, Vite, Tailwind CSS и др.)
              </p>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
              Запустите в режиме разработки
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/70 text-sm mb-2">Для разработки с горячей перезагрузкой:</p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> npm run dev
              </div>
              <p className="text-white/50 text-xs mt-2">
                Откройте в браузере: <span className="text-blue-400">http://localhost:5173</span>
              </p>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">4</span>
              Соберите для продакшена (опционально)
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-white/70 text-sm mb-2">Создайте оптимизированную сборку:</p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> npm run build
              </div>
              <p className="text-white/50 text-xs mt-2">
                Готовые файлы появятся в папке <code className="text-yellow-400">dist/</code>. 
                Их можно разместить на любом веб-сервере (Nginx, Apache, Netlify, Vercel и т.д.)
              </p>
            </div>
          </section>

          {/* Step 5 - Preview production */}
          <section>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">5</span>
              Предпросмотр сборки (опционально)
            </h3>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400">
                <span className="text-white/30 mr-2">$</span> npm run preview
              </div>
              <p className="text-white/50 text-xs mt-2">
                Запустит локальный сервер для проверки собранной версии.
              </p>
            </div>
          </section>

          {/* Quick summary */}
          <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
            <h3 className="text-white font-semibold mb-3">⚡ Быстрый старт (все команды)</h3>
            <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-green-400 space-y-1">
              <div><span className="text-white/30 mr-2">$</span> git clone &lt;url&gt; && cd solar-system</div>
              <div><span className="text-white/30 mr-2">$</span> npm install</div>
              <div><span className="text-white/30 mr-2">$</span> npm run dev</div>
              <div className="text-white/40 pt-1"># → http://localhost:5173</div>
            </div>
          </section>

          {/* Tech stack */}
          <section>
            <h3 className="text-white font-semibold mb-3">🛠 Стек технологий</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'React 19', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
                { name: 'TypeScript', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
                { name: 'Vite', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
                { name: 'Tailwind CSS', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
                { name: 'HTML5 Canvas', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h3 className="text-white font-semibold mb-3">🔧 Решение проблем</h3>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <p className="text-yellow-400 text-sm font-medium">Port 5173 уже занят?</p>
                <p className="text-white/60 text-xs mt-1">
                  Vite автоматически предложит другой порт, или используйте:{' '}
                  <code className="text-green-400">npm run dev -- --port 3000</code>
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <p className="text-yellow-400 text-sm font-medium">Ошибки при npm install?</p>
                <p className="text-white/60 text-xs mt-1">
                  Удалите папку <code className="text-green-400">node_modules</code> и файл{' '}
                  <code className="text-green-400">package-lock.json</code>, затем повторите{' '}
                  <code className="text-green-400">npm install</code>
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                <p className="text-yellow-400 text-sm font-medium">Хотите открыть на другом устройстве в сети?</p>
                <p className="text-white/60 text-xs mt-1">
                  Используйте: <code className="text-green-400">npm run dev -- --host</code>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeployGuide;
