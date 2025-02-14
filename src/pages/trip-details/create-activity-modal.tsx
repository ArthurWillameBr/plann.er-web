import { X, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/button";
import { FormEvent } from "react";
import { api } from "@/lib/axios";
import { useParams } from "react-router-dom";
import { Input } from "@/components/input";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();

    const occurs_at = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      occurs_at,
      title,
    });

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-500 hover:text-zinc-300" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>
        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex items-center gap-2 h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg">
            <Tag className="size-5 text-zinc-400" />
            <Input
              name="title"
              placeholder="Qual a atividade"
              className="bg-transparent text-lg placeholder:zinc-400 w-full outline-none "
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 h-14 flex-1 px-5 bg-zinc-950 border border-zinc-800 rounded-lg">
              <Calendar className="size-5 text-zinc-400" />
              <Input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="[color-scheme:dark]"
              />
            </div>
          </div>
          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  );
}
