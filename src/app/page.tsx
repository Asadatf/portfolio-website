"use client";

import ClientChatWrapper from "@/components/chatbot/ClientChatWrapper";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero section with proper padding to avoid navbar overlap */}
      <section className="pt-4 pb-24 md:pb-28 px-4">
        <Hero
          name="Asad"
          positions={[
            "Full Stack Developer",
            "AI Engineer",
            "Software Engineer",
          ]}
          aboutMe="I'm a software engineer with experience in full-stack development, cloud technologies, and machine learning. I specialize in building modern web apps using React, Next.js, Node.js, and MongoDB, with deployment experience on AWS and Vercel. Currently, I'm a trainee at Empiric Technology, working on scalable, CMS-driven apps with Strapi and Payload. I love solving problems, learning new tools, and building meaningful projects."
          profileImage="/images/profile/profile.jpeg"
          cvLink="/resume"
          linkedin="https://linkedin.com/in/asad-tariq-atf"
          github="https://github.com/Asadatf"
        />
      </section>
      <ClientChatWrapper />

      {/* Add other sections of your homepage below */}
    </main>
  );
}
