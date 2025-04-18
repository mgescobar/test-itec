export default function AboutMePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#2600FF] mb-2">
          Matheus Garcia Escobar
        </h1>
        <p className="text-xl text-gray-600">Desenvolvedor Full-Stack</p>
      </header>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          👨‍💻 Sobre Mim
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Desenvolvedor web com 2+ anos de experiência em desenvolvimento full-stack. 
          Especializado na criação de APIs robustas e interfaces intuitivas utilizando 
          Node.js, React e TypeScript. Comprometido com boas práticas de desenvolvimento 
          como Clean Architecture e SOLID.
        </p>
      </section>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🎓 Formação
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700">Bacharelado em Sistemas de Informação</h3>
          <p className="text-gray-600">Universidade Federal de Santa Maria (UFSM)</p>
          <p className="text-sm text-gray-500">2019 – 2024</p>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🛠️ Habilidades Técnicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#2600FF]">Back-end</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Adonis', 'Express', 'PHP/Laravel', 'Python', 'PostgreSQL', 'MySQL'].map((skill) => (
                <span key={skill} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#2600FF]">Front-end</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Angular/Ionic', 'Material UI', 'Styled Components', 'Selenium'].map((skill) => (
                <span key={skill} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          💼 Experiência Profissional
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Desenvolvedor Backend - SouJunior</h3>
            <p className="text-sm text-gray-500 mb-2">2024 - Presente</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Desenvolvimento de APIs RESTful com Laravel</li>
              <li>Colaboração em equipe ágil utilizando Scrum e Kanban</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Desenvolvedor Full-Stack - Drakkar Solos</h3>
            <p className="text-sm text-gray-500 mb-2">2022 - 2024</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Desenvolvimento de sistemas web com React e Node.js</li>
              <li>Criação de APIs RESTful para integração entre sistemas</li>
              <li>Implementação de soluções mobile com Ionic/Angular</li>
              <li>Otimização de performance e qualidade de código</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Bolsista PET/MEC - UFSM</h3>
            <p className="text-sm text-gray-500 mb-2">2020 - 2024</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Organização de eventos e workshops tecnológicos</li>
              <li>Desenvolvimento de projetos multidisciplinares</li>
              <li>Promoção de atividades de ensino e extensão</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}