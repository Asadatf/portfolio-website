export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 border-b border-accent-neon/30 pb-2">
        About <span className="text-accent-neon">Me</span>
      </h1>

      <div className="bg-glass-dark backdrop-blur-md p-6 rounded-xl border border-accent-neon/20 shadow-glass">
        <p className="mb-4">
          Hello! I'm [Your Name], a passionate developer in my final semester of
          [Your Degree]. Currently working as [Your Job Title], I specialize in
          building modern web applications with a focus on user experience and
          performance.
        </p>

        <h2 className="text-xl font-semibold mb-3 text-accent-neon mt-6">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-glass-light p-3 rounded-lg">
            Frontend Development
          </div>
          <div className="bg-glass-light p-3 rounded-lg">React/Next.js</div>
          <div className="bg-glass-light p-3 rounded-lg">
            AI & Machine Learning
          </div>
          <div className="bg-glass-light p-3 rounded-lg">
            Backend Development
          </div>
          <div className="bg-glass-light p-3 rounded-lg">Three.js</div>
          <div className="bg-glass-light p-3 rounded-lg">UI/UX Design</div>
        </div>

        <h2 className="text-xl font-semibold mb-3 text-accent-neon mt-6">
          Experience
        </h2>
        <div className="space-y-4">
          <div className="border-l-2 border-accent-purple pl-4">
            <h3 className="font-semibold">Company Name</h3>
            <p className="text-sm text-gray-400">Position • Date - Present</p>
            <p className="mt-2">
              Brief description of your role and responsibilities.
            </p>
          </div>

          <div className="border-l-2 border-accent-purple pl-4">
            <h3 className="font-semibold">Previous Company</h3>
            <p className="text-sm text-gray-400">
              Position • Start Date - End Date
            </p>
            <p className="mt-2">
              Brief description of your role and responsibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
