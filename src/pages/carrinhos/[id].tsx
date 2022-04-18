import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
// cria um tipo de dados para comentário
interface Item {
  id: string;
  produto: string;
  carrinhoId: string;
}
// cria um tipo de dados de vetor de comentários
interface ItemArray {
  itens: Item[];
}

export default function Carrinho({ itens }: ItemArray) {
  const router = useRouter();
  if (router.isFallback) {
    // estiver como true
    return <p> Loading ... </p>;
  }
  return (
    <>
      <h1> Carrinho {router.query.id}</h1>
      <ul>
        {itens.map((item) => (
          <li key={item.id}> {item.produto} </li>
        ))}
      </ul>
    </>
  );
}

// gera o conteúdo das páginas para cada post, consulta os comentários de cada post
// context contém todos os ids dos posts
export const getStaticProps: GetStaticProps<ItemArray> = async (context) => {
  // recupera id do post
  const { id } = context.params;
  // faz a consulta
  const response = await fetch(`http://localhost:3334/itens?carrinhoId=${id}`);
  // converte resposta em json - temos os comentários de um post id
  const itens = await response.json();
  // vamos retornar
  return {
    props: {
      itens,
    },
    revalidate: 5,
  };
};

// vai ser executado antes de carregar o componente
// recupera todos os posts
export const getStaticPaths: GetStaticPaths = async () => {
  // vamos obter os posts
  //const response = await fetch(`http://localhost:3333/posts`)
  //const posts = await response.json()
  // a variável paths vai conter todos os ids de todos os posts
  //const paths = posts.map( post => {
  //    return {
  //            params: {
  //                id: String(post.id) // chama getStaticProps
  //            }
  //        }
  //    })
  // retorno da função
  return {
    paths: [], // não gera as páginas
    // não gera páginas, apenas no primeiro acesso
    // inicia a geração de cada página estática para cada post
    fallback: true, // false - retorna 404 quando não tem a página
    // true - cria página automaticamente
  };
};
