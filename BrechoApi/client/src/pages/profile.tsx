export default function Profile() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Perfil</h1>
        
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Área do usuário
          </h2>
          <p className="text-text-muted">
            Faça login para acessar seu perfil e histórico de compras
          </p>
        </div>
      </div>
    </div>
  );
}
