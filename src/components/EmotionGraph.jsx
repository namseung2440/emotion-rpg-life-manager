import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function EmotionGraph({ data }) {

  const counts = {};

  data.forEach((item) => {
    const emotion = item.EMOTION || item.emotion;
    counts[emotion] = (counts[emotion] || 0) + 1;
  });

  const chartData = Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));

  const COLORS = [
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4444",
    "#8884d8",
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default EmotionGraph;