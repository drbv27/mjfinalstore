import { create } from "zustand";

export const useCounterStore = create((set) => ({
  //Crear el estado e inicializarlo
  count: 0,
  //crear la acciones o funciones para modificar el estado
  increment: () => set((state) => ({ count: state.count + 1 })), //accion : set((state)=>({miestado:lo que deba hacer}))
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(() => ({ count: 0 })),
}));

/*

const [count,setCount] = useState(0)

function incrementar = {
    setCount(count+1)
}

*/
