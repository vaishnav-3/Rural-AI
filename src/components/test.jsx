import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Anjali Verma',
    role: 'Village Head, Maharashtra',
    image: '/user1.jpg',
    text: 'This platform transformed our approach to farming and education. It truly empowers rural communities.',
  },
  {
    name: 'Ravi Patil',
    role: 'Agricultural Officer',
    image: '/user2.jpg',
    text: 'I’ve never seen a tool this effective for real-time weather and crop insights. A must-have for rural development.',
  },
  {
    name: 'Pooja Mehta',
    role: 'Teacher, Nashik',
    image: '/user3.jpg',
    text: 'The AI-backed gives very good suggestions for development of villages.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-white text-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-950 text-transparent bg-clip-text mb-12">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-cyan-500 object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic leading-relaxed">“{t.text}”</p>
              <div className="mt-4 flex space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;