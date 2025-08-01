import Image from "next/image";

export default function TeamSection() {
  const team = [
    {
      name: "John Doe",
      role: "CEO",
      quote: "Connecting talent with opportunity to build brighter futures.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      quote: "Driving innovation to simplify job searching and hiring.",
    },
    {
      name: "Alex Brown",
      role: "Designer",
      quote: "Designing seamless experiences that empower job seekers and employers.",
    },
  ];

  return (
    <section className="mx-auto w-full px-14 py-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
          >
            <Image
        src="/images/avatar.png"
        alt={member.name}
        width={100}
        height={100}
        className="rounded-sm drop-shadow-md object-contain"
        />

            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
            <p className="mt-2 italic text-sm text-gray-600">"{member.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
