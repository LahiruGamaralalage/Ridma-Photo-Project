export interface Project {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  location: string;
  year: string;
  vision: string;
  highlights: string[];
  equipment: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "sigiriya-dawn",
    title: "The Sigiriya Dawn",
    tag: "Landscape",
    image: "https://images.unsplash.com/photo-1612862862126-865765df2ded?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A breathtaking capture of the Sigiriya rock fortress at the crack of dawn, showing the harmony between ancient architecture and nature.",
    location: "Sigiriya, Sri Lanka",
    year: "2024",
    vision: "My goal was to capture the fortress not just as a monument, but as a living part of the Sri Lankan landscape. By arriving hours before dawn, I waited for that specific 'blue hour' transition where the jungle mist meets the first golden rays.",
    highlights: [
      "Captured during the rare monsoon clearing",
      "Utilized natural mist for depth and atmosphere",
      "Perfect symmetry between the gardens and the rock"
    ],
    equipment: ["Sony A7R IV", "24-70mm f/2.8 GM", "Neutral Density Filter"],
    gallery: [
      "https://images.unsplash.com/photo-1594391045445-64ea3c6ff16b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580889240912-c39ecefd3d95?q=80&w=879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "lotus-majesty",
    title: "Lotus Majesty",
    tag: "Architectural",
    image: "https://images.unsplash.com/photo-1546656495-fc838de15e5c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Capturing the modern skyline of Colombo, centered around the iconic Lotus Tower as it lights up the city night.",
    location: "Colombo, Sri Lanka",
    year: "2023",
    vision: "Urban photography in Colombo is about contrast. I wanted to showcase the Lotus Tower as a symbol of progress, rising above the historic Beira Lake. The challenge was balancing the artificial lights of the tower with the ambient city glow.",
    highlights: [
      "Long exposure to capture water stillness",
      "High-dynamic-range processing for neon clarity",
      "Unique low-angle perspective from the lakeside"
    ],
    equipment: ["Canon EOS R5", "15-35mm f/2.8L", "Manfrotto Tripod"],
    gallery: [
      "https://images.unsplash.com/photo-1740812517101-fee71e001ebc?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1579109571569-f67b0919a66d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "yala-predator",
    title: "Yala Predator",
    tag: "Wildlife",
    image: "https://images.unsplash.com/photo-1743014118271-415197f9b0ef?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A rare and intimate look at the Sri Lankan leopard in its natural habitat within the Yala National Park.",
    location: "Yala, Sri Lanka",
    year: "2024",
    vision: "Wildlife photography requires immense patience. I spent three days tracking this specific male leopard. The vision was to capture a gaze that connects the viewer directly with the raw power of the island's top predator.",
    highlights: [
      "Extremely rare eye-contact moment",
      "Natural camouflage detailing",
      "Shot during the golden hour in Block 1"
    ],
    equipment: ["Nikon Z9", "600mm f/4 TC VR S", "Camouflage blind"],
    gallery: [
      "https://images.unsplash.com/photo-1688537173574-d3414696018f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1634557782718-e31869ec95f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  {
    id: "mirissa-blues",
    title: "Mirissa Blues",
    tag: "Nature",
    image: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The serene and vibrant blue waters of the Mirissa coast, capturing the essence of the tropical island paradise.",
    location: "Mirissa, Sri Lanka",
    year: "2023",
    vision: "The south coast is defined by its rhythm. I focused on the movement of the waves against the palm-fringed shoreline, aiming for a palette that feels both energetic and peaceful.",
    highlights: [
      "Drone perspective for scale",
      "Vibrant turquoise water clarity",
      "Minimalist composition of the Coconut Tree Hill"
    ],
    equipment: ["DJI Mavic 3 Pro", "Polarizing Filters"],
    gallery: [
      "https://images.unsplash.com/photo-1734279135115-6d8984e08206?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1613693699413-7dde0260f437?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  }
];
