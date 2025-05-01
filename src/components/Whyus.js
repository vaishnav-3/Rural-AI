
"use client"

import { useRef } from "react"
import { motion,  useInView } from "framer-motion"

const features = [
  {
    title: "Community-Centric Assessment",
    description: "We begin with a deep readiness analysis focused on rural communities—covering essential aspects like digital literacy, existing local infrastructure, data gaps, and cultural nuances to ensure tailored deployment of AI tools.",
    image: "/Whyus/Inspection.png",
    alt: "Community inspection illustration"
  },
  {
    title: "AI-Powered Roadmaps",
    description: "Our platform dynamically generates development timelines using AI—prioritizing initiatives in agriculture, education, healthcare, and resource management based on real-time rural needs and local capacities.",
    image: "/Whyus/Design.png",
    alt: "AI timeline illustration"
  },
  {
    title: "Transparent Implementation & Monitoring",
    description: "With integrated monitoring dashboards and adaptive metrics, we ensure transparent implementation, continuous evaluation, and proactive course correction—all tailored for rural challenges and opportunities.",
    image: "/Whyus/Plc_based.png",
    alt: "Monitoring tools illustration"
  }
]

function FeatureCard({ title, description, image, alt, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white backdrop-blur-xl rounded-xl p-6 shadow-xl hover:shadow-3xl transition-shadow"
    >
      <div section id="why-us" className="relative h-48 mb-6">
        <motion.img
          src={image}
          alt={alt}
          className="w-full h-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-black text-center">{title}</h3>
      <p className="text-gray-800 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function AnimatedFeatures() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden ">
        <h2 className="text-3xl font-bold text-center mb-7 -mt-1">Why Us?</h2>
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-justify">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}


