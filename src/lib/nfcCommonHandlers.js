export const onReadErrorWithAlert = (event) => {
  console.log(event);
  alert("何らかの原因で読み込みに失敗しました");
};

export const onStanbyErrorWithAlert = (error) => {
  console.log(error);
  alert("NFCカードの読み込み準備に失敗しました");
};
