import { GetServerSideProps } from "next";

interface ITime {
  // 1 time
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  estadio: string;
  capacidade: number;
}

interface ITimes {
  // array de times
  times: ITime[];
}

export default function Times({ times }: ITimes) {
  return (
    <div>
      <h1
        style={{
          marginBottom: "12px",
        }}
      >
        {" "}
        Times{" "}
      </h1>
      <h5> Carlos Eduardo - 22594 - Engenharia de Software</h5>
      <h5> Maria Fernanda - 22609 - Engenharia de Software</h5>
      <table
        style={{
          backgroundColor: "green",
          marginTop: "30px",
          margin: "auto",
          border: "solid 3px black",
        }}
      >
        <thead
          style={{
            backgroundColor: "greenyellow",
            color: "black",
          }}
        >
          <tr>
            <th
              style={{
                borderBottom: "solid 2px black",
              }}
            >
              Nome
            </th>
            <th
              style={{
                borderBottom: "solid 2px black",
              }}
            >
              Localização
            </th>
            <th
              style={{
                borderBottom: "solid 2px black",
              }}
            >
              Estadio
            </th>
            <th
              style={{
                borderBottom: "solid 2px Black",
              }}
            >
              Capacidade
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            paddingLeft: "6px",
            paddingRight: "6px",
          }}
        >
          {times.map((time) => (
            <tr key={time.id}>
              <td
                style={{
                  padding: "3px 12px 0px 12px",
                  borderRight: "solid 1px greenyellow",
                  borderBottom: "solid 1px greenyellow",
                }}
              >
                {time.nome}
              </td>
              <td
                style={{
                  padding: "3px 12px 0px 12px",
                  borderRight: "solid 1px greenyellow",
                  borderBottom: "solid 1px greenyellow",
                }}
              >
                {time.cidade} - {time.estado}
              </td>
              <td
                style={{
                  padding: "3px 12px 0px 12px",
                  borderRight: "solid 1px greenyellow",
                  borderBottom: "solid 1px greenyellow",
                }}
              >
                {time.estadio}
              </td>
              <td
                style={{
                  padding: "3px 50px 0px 50px",
                  borderBottom: "solid 1px greenyellow",
                }}
              >
                {time.capacidade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// função executada antes do componente ser carregado
// é o servidor node antes do front
export const getServerSideProps: GetServerSideProps<ITimes> = async () => {
  const response = await fetch("http://localhost:3333/times");
  const times = await response.json();
  return {
    props: {
      times,
    },
  };
};
