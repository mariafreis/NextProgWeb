import { GetStaticProps } from "next";
interface Carrinho {
  // representa 1 carrinho
  id: string;
  data: string;
  valor: string;
}

interface Carrinhos {
  // representa vetor de posts
  carrinhos: Carrinho[];
}

export default function Carrinhos({ carrinhos }: Carrinhos) {
  return (
    <div>
      <h1> Lista de Carrinhos</h1>
      <ul>
        {carrinhos.map((carrinho) => (
          <li key={carrinho.id}> {carrinho.valor} </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Carrinhos> = async () => {
  const response = await fetch("http://localhost:3334/carrinhos");
  const carrinhos = await response.json();
  return {
    props: {
      carrinhos, // posts vai para o componente
    },
    revalidate: 5000,
  };
};
