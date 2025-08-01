// Casa Pjoxante Brand Constants

export const PJOXANTE_COLORS = {
  // Primary brand colors
  green: '#3E8D35',
  greenDark: '#263721',
  greenLight: '#C1DCAB',
  
  // Brown variants (human figures)
  brownLight: '#8C6853',
  brownMedium: '#49362E',
  brownDark: '#33221D',
  
  // Secondary colors
  yellowGreen: '#8C6523',
  yellow: '#DDDF4F',
  
  // Complementary colors (max 2 per composition)
  turquoise: '#35B39D',
  blue: '#36B5CC',
  purple: '#523089',
  lilac: '#9474B2',
  
  // Utility
  white: '#FFFFFF',
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Sobre la Casa', href: '#sobre-la-casa' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Publicaciones', href: '/blog' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#pack' },
  { label: 'Consultorías', href: '/consultorias' },
  { label: 'Catálogo de libros', href: '/catalogo-libros' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const CONTACT_INFO = {
  email: 'info@casapjoxante.org',
  phone: '+52 (55) 1234-5678',
  location: 'Ciudad de México, México',
  description: 'Transformando comunidades a través de la educación, investigación y promoción del buen vivir',
} as const;

export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
  linkedin: '#',
} as const;

// Typography constants
export const TYPOGRAPHY = {
  primary: 'font-cerco',
  secondary: 'font-century',
  weights: {
    light: 'font-light',
    medium: 'font-medium',
    bold: 'font-bold',
  },
} as const;

// Component size variants
export const COMPONENT_SIZES = {
  hero: {
    title: 'text-4xl md:text-6xl lg:text-7xl',
    subtitle: 'text-lg md:text-xl lg:text-2xl',
  },
  section: {
    title: 'text-2xl md:text-3xl lg:text-4xl',
    subtitle: 'text-base md:text-lg',
  },
  card: {
    title: 'text-lg md:text-xl',
    description: 'text-sm md:text-base',
  },
} as const;