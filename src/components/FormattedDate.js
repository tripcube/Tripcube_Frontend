function FormattedDate(timestamp) {
  // 타임스탬프를 Date 객체로 변환
  const date = new Date(timestamp);

  // 원하는 형식으로 날짜와 시간을 포맷팅
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return { year, month, day, hours, minutes, seconds }; // 객체 리터럴을 반환
}

export default FormattedDate;
