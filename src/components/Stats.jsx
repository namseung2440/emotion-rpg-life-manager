function Stats({ data }) {

  if (data.length === 0) {
    return (
      <div>
        <h3>Emotion Stats</h3>
        <p>데이터 없음</p>
      </div>
    );
  }

  const emotionCounts = {};

  data.forEach(item => {
    const emotion = item.emotion;

    if (!emotionCounts[emotion]) {
      emotionCounts[emotion] = 0;
    }

    emotionCounts[emotion]++;
  });

  return (

    <div>

      <h3>Emotion Stats</h3>

      {Object.entries(emotionCounts).map(([emotion, count]) => (

        <p key={emotion}>
          {emotion} : {count}
        </p>

      ))}

    </div>

  );

}

export default Stats;