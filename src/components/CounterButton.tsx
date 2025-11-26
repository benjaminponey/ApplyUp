export type CounterButtonProps = {
    count: number
    increment: () => void
}

export const CounterButton = ({
    count,
    increment
}: CounterButtonProps) => {
  return (
    <button onClick={increment}>
      count is {count}
    </button>
  );
};
