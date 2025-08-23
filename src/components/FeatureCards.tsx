import { motion } from "motion/react";
import { Card } from "./ui/card";
import {
  Calendar,
  Shield,
  Brain,
  MapPin,
  Search,
  Layers,
} from "lucide-react";

// Short, one-line descriptions
const features = [
  {
    icon: Calendar,
    title: "Calendar-Centric Home",
    description:
      "See and add your ideas directly on each calendar day.",
    color: "text-flint-accent-bright",
    bgColor: "bg-flint-accent/20",
    borderColor: "border-flint-accent/30",
  },
  {
    icon: Shield,
    title: "Private Thought Capture",
    description:
      "Your thoughts stay safe—locally stored and locked with a secret code.",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/30",
  },
  {
    icon: Brain,
    title: "AI-Assisted Planning",
    description:
      "AI helps plan your day and suggests schedules based on your notes.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/30",
  },
  {
    icon: MapPin,
    title: "AI Deep-Seek & Roadmaps",
    description:
      "Get step-by-step plans to turn ideas into real action.",
    color: "text-flint-accent-bright",
    bgColor: "bg-flint-accent/20",
    borderColor: "border-flint-accent/30",
  },
  {
    icon: Search,
    title: "Smart Retrieval",
    description:
      "Easily find and connect your past thoughts with powerful AI search.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/30",
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description:
      "Calendar, notes, and AI work together for a smooth workflow.",
    color: "text-flint-accent-bright",
    bgColor: "bg-flint-accent/20",
    borderColor: "border-flint-accent/30",
  },
];

export function FeatureCards() {
  return (
    <section
      id="features"
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-flint-black font-iosevka"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 font-iosevka leading-tight">
            Your private{" "}
            <span className="bg-gradient-to-r from-flint-accent to-flint-accent-bright bg-clip-text text-transparent">
              thinking companion
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground font-iosevka max-w-2xl mx-auto px-4">
            Calendar, privacy, and AI—organized for your mind.
          </p>
        </motion.div>

        {/* Feature Grid - Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="group"
              >
                <Card
                  className={`h-full p-4 sm:p-6 md:p-8 border ${feature.borderColor} hover:border-flint-accent-bright/60 transition-all duration-500 hover:shadow-2xl hover:shadow-flint-accent/10 bg-flint-dark/80 backdrop-blur-sm relative overflow-hidden touch-manipulation`}
                >
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} blur-3xl -translate-y-16 translate-x-16`}
                    />
                  </div>
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.13,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 },
                      }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-4 sm:mb-6 md:mb-7 group-hover:shadow-lg group-hover:shadow-flint-accent/20 transition-all duration-300`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ${feature.color}`}
                      />
                    </motion.div>
                    {/* Content */}
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-flint-accent-bright transition-colors duration-300 font-iosevka leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-iosevka">
                        {feature.description}
                      </p>
                    </div>
                    {/* Interactive accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1 + 0.3,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                      className="w-full h-px bg-gradient-to-r from-flint-accent to-flint-accent-bright mt-4 sm:mt-6 md:mt-8 origin-left shadow-sm shadow-flint-accent/50 group-hover:shadow-md group-hover:shadow-flint-accent-bright/50 transition-all duration-300"
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16 md:mt-20"
        >
          <div className="inline-flex items-center px-4 sm:px-5 py-2 rounded-full bg-flint-darker border border-flint-accent/20 text-flint-accent-bright text-sm sm:text-base md:text-lg font-iosevka max-w-full">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-flint-accent-bright rounded-full mr-2 sm:mr-3 animate-pulse shadow-sm shadow-flint-accent-bright flex-shrink-0"></span>
            <span className="text-center">Privacy-first • AI-powered • Calendar-Centric</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}