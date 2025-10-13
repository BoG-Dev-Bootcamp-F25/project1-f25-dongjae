import { Train } from "./Train";
interface TrainListProps {
  color: string;
  data: any[];
}

export const TrainList = ({color, data}: TrainListProps) => {
  const filteredData = data.filter(
    (train) => train.LINE.toLowerCase() === color.toLowerCase()
  );

  return (
    <div>
      <h2>{color.toUpperCase()} Line Trains</h2>

      {filteredData.length === 0 ? (
        <p>No trains available for this line.</p>
      ) : (
        filteredData.map((train, index) => (
          <Train key={index} train={train} />
        ))
      )}
    </div>
  );
};