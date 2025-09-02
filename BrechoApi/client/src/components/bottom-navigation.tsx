import { Home, Grid3X3, Heart, User } from "lucide-react";
import { useLocation } from "wouter";

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navigationItems = [
    { key: "/", label: "Início", icon: Home },
    { key: "/categories", label: "Categorias", icon: Grid3X3 },
    { key: "/favorites", label: "Favoritos", icon: Heart },
    { key: "/profile", label: "Perfil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navigationItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setLocation(key)}
            className={`flex flex-col items-center py-2 transition-colors ${
              location === key ? "text-primary" : "text-text-muted"
            }`}
            data-testid={`button-nav-${key.replace("/", "") || "home"}`}
          >
            <Icon className="text-lg h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
