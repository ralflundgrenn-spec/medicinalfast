export type Urgencia = "agora" | "hoje" | "agendar";
export type CanalContacto = "video" | "telefone" | "chat";

export interface AgendamentoInput {
  nome: string;
  telefone: string;
  email: string;
  tipo_consulta: string;
  motivo?: string;
  precisa_atestado: boolean;
  urgencia: Urgencia;
  canal_contacto: CanalContacto;
}

export interface ConsultaPlano {
  id: string;
  nome: string;
  preco: string;
  descricao: string;
  duracao: string;
  destaque?: boolean;
  inclui: string[];
}
