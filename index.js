// expressモジュールの呼び出し
const express = require("express");
// 呼び出したexpressモジュールのインスタンス化して使えるようにする
const app = express();
// ポート番号の指定
const port = 5000;
// expressのJsonを扱うことを宣言
app.use(express.json());

// ポート5000番でexpressサーバーを起動
app.listen(port, () => console.log("サーバー起動しました"));

// ルートパスを指定すると、GETリクエストに対してレスポンスを返す()ここでのルートパスはhttp://localhost:5000/)
app.get("/", (req, res) => {
  // リクエストを受け取った際にクライアントに送るメッセージを指定
  res.send("リクエストを受け取りました");
});

// 顧客の変数定義
const customers = [
  { title: "田中", id: 1 },
  { title: "安藤", id: 2 },
  { title: "鈴木", id: 3 },
  { title: "斎藤", id: 4 },
  { title: "橋本", id: 5 },
];

// エンドポイント(URL)に「/get/customers」のルートハンドラを指定
// getメソッドのみブラウザ上でURLを叩くと、確認ができる
app.get("/get/customers", (req, res) => {
  res.send(customers);
});

// エンドポイント(URL)に「/post/customers」のルートハンドラを指定
// getメソッド以外はPostmanを使って、挙動を確認する
app.post("/post/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  customers.push(customer);
  res.send(customer);
});

// エンドポイント(URL)に「/put/customers」のルートハンドラを指定
app.put("/put/customers/:id", (req, res) => {
  // ルートパラメータとして渡されたIDを利用して、指定されたIDの顧客を検索
  // 見つかった顧客は customer 変数に格納される
  const customer = customers.find(
    // 顧客IDを整数に変換し、customers配列の中で一致するIDを持つ顧客を見つける
    (customer) => customer.id === parseInt(req.params.id)
  );
  // 見つかった顧客のタイトルをリクエストのボディから新しい値に更新
  customer.title = req.body.title;
  // 更新後の顧客情報をクライアントに送信
  res.send(customer);
});

// エンドポイント(URL)に「/delete/customers」のルートハンドラを指定
app.delete("/delete/customers/:id", (req, res) => {
  // ルートパラメータとして渡されたIDを利用して、指定されたIDの顧客を検索
  // 見つかった顧客は customer 変数に格納される
  const customer = customers.find(
    // 顧客IDを整数に変換し、customers配列の中で一致するIDを持つ顧客を見つける
    (customer) => customer.id === parseInt(req.params.id)
  );
  // 見つかった顧客のインデックスを取得
  const customerIndex = customers.indexOf(customer);
  // customers配列から該当する顧客を削除
  customers.splice(customerIndex, 1);
  // 削除した顧客情報をクライアントに送信
  res.send(customer);
});
