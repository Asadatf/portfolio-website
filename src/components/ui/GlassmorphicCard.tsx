"use client";

import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/types";

interface GlassmorphicCardProps {
  project: Project;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ project }) => {
  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-teal-700/20 rounded-lg blur-sm group-hover:blur transition duration-300"></div>
      <div className="relative h-full bg-gray-900/70 backdrop-blur-md border border-teal-500/20 rounded-lg overflow-hidden shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-teal-500/20">
        {/* Project Image with Overlay */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/80 z-10"></div>
          <img
            src={project.image || "/images/projects/default.jpg"}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-3 left-3 z-20">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-5">
          <p className="text-gray-300 mb-4 h-24 overflow-hidden text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs rounded-full bg-teal-900/60 text-teal-400 border border-teal-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between items-center mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-400 transition-colors flex items-center gap-2 p-2 rounded-md hover:bg-teal-900/30"
            >
              <FaGithub size={20} />
              <span className="text-sm">GitHub</span>
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-teal-400 transition-colors flex items-center gap-2 p-2 rounded-md hover:bg-teal-900/30"
              >
                <FaExternalLinkAlt size={16} />
                <span className="text-sm">Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Glowing border effect on hover */}
        <div className="absolute inset-0 border border-teal-500/0 rounded-lg transition-all duration-300 group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default GlassmorphicCard;
