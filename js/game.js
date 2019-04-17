// phina.js をグローバル領域に展開
phina.globalize();

var ASSETS = {
    image: {
        title: "img/title.jpg",
        bg1: "img/bg1.jpg",
        hito1: "img/hito1.png",
        enemy1: "img/enemy1.png",
        gu: "img/gu.jpg",
        tyo: "img/tyo.jpg",
        pa: "img/pa.jpg",
    },
};

var MESSAGE_SPEED = 4; //1<n 低いほど早い
var FONT_SIZE = 25;
var SCREEN_WIDTH = 800;              // スクリーン幅
var SCREEN_HEIGHT = 600;

// 最初のセリフ
const MAINNTEXTS = [
    "少年は激怒した。",
    "必ず、かの邪智暴虐の主人公らを\n除かなければならぬと決意した。",
    "少年には名がない。\nいつの日も皆に都合よく使われてきた。",
    "これは少年の復讐の物語である。",
    "【少年】\n人生つまんねぇ〜〜〜〜〜〜〜〜〜〜\n\nいつも皆にフリーで使われて、辛いぜぇ〜",
    "【少年】\n俺も有名になって、皆から使用料ぶんどりたいぁ〜",
    "【少年】\n・・・・・・・・・・・・\n・・・・・・・・・・！！！！",
    "【少年】\nそうだ！\n\n俺が有名な主人公どもをぶっ潰せばいい！！！",
    "アソパソマソが現れた！！！",
    "【アソパソマソ】\nぼく、アソパソマソ！\n\n元気１００倍！アソパソマソ！！",
    "アソパソマソが勝負を仕掛けてきた！！！",
    "少年はどの手を出す？？\n（上の画像を選択してね）",
];
//


//============================================
// タイトルシーン
//============================================
phina.define('TitleScene', {
    superClass: 'CanvasScene',

    init: function (options) {
        this.superInit(options);

        // this.backgroundColor = '#444';
        this.bg = Sprite("title").addChildTo(this);
        this.bg.origin.set(0, 0);

        var label1 = Label({
            text: 'いらすとやの野望',
            fill: 'white',
            fontSize: 64,
        }).addChildTo(this);
        label1.x = this.gridX.center();
        label1.y = this.gridY.center() / 3;

        var label2 = Label('画面をクリック').addChildTo(this);
        label2.x = this.gridX.center();
        label2.y = this.gridY.center();
    },
    onclick: function () {
        this.exit();
    }
});

//============================================
// メインシーン
//============================================
phina.define('MainScene', {
    superClass: 'CanvasScene',
    // superClass: 'DisplayScene',
    init: function (options) {
        this.superInit(options);
        // 背景を指定
        // this.bg = Sprite("bg").addChildTo(this);
        // this.bg.origin.set(0, 0); // 左上基準に変更

        // 背景色
        this.backgroundColor = "black";

        // 背景用グループ
        this.backImageGroup = DisplayElement().addChildTo(this);
        // 敵グループ
        this.enemyImageGroup = DisplayElement().addChildTo(this);

        //主人公表示
        var sprite = Sprite('hito1').addChildTo(this).setPosition(this.gridX.center() * 6 / 4, this.gridY.center());

        // テキストエリアの矩形
        this.labelRect = LabelRect().addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.center(5.5));

        this.labelRect.texts = MAINNTEXTS;
        this.labelRect.textIndex = 0;
        this.labelRect.charIndex = 0;

        // ジャンケン
        this.guPosi = DisplayElement().addChildTo(this);
        this.tyoPosi = DisplayElement().addChildTo(this);
        this.paPosi = DisplayElement().addChildTo(this);

        this.setPhase();

        //ラベルエリアがクリックされた場合
        this.labelRect.onclick = function () {
            if (this.textAll) {
                this.nextText();
            } else {
                this.showAllText();
            }
        }

        // this.labelRect.update = function (app) {
        //     if (app.pointer.getPointingStart() || app.keyboard.getKeyDown("enter")) {
        //         // if (this.labelRect.onpointstart) {
        //         if (this.textAll) {//テキスト全部表示済み
        //             this.nextText();
        //             // 次の背景に切替
        //             this.setPhase();
        //         } else {
        //             this.showAllText();   //テキスト全部表示してないなら、全表示
        //         }
        //     } else {    //クリックされてないなら、文字送り
        //         this.addChar();
        //     }

        //     if (this.textAll) {
        //         this.nextTriangle.show();
        //     } else {
        //         this.nextTriangle.hide();
        //     }
        // }
    },

    //更新
    update: function (app) {
        //クリックかEnterキーの入力があった場合
        this.labelRect.addChar();
        if (this.labelRect.textAll) {
            this.setPhase();
        }

        if (this.labelRect.textAll) {
            this.labelRect.nextTriangle.show();
        } else {
            this.labelRect.nextTriangle.hide();
        }
    },
    // 更新
    // update: function (app) {
    //     //クリックかEnterキーの入力があった場合
    //     if (app.pointer.getPointingStart() || app.keyboard.getKeyDown("enter")) {
    //         // if (this.labelRect.onpointstart) {
    //         if (this.labelRect.textAll) {//テキスト全部表示済み
    //             console.log("ok1");
    //             this.labelRect.nextText();
    //             // 次の背景に切替
    //             this.setPhase();
    //         } else {
    //             this.labelRect.showAllText();
    //         }
    //     } else {
    //         this.labelRect.addChar();
    //         console.log("ok2");
    //     }

    //     if (this.labelRect.textAll) {
    //         this.labelRect.nextTriangle.show();
    //     } else {
    //         this.labelRect.nextTriangle.hide();
    //     }
    // },

    setPhase: function () {
        console.log(this.labelRect.textIndex);
        switch (this.labelRect.textIndex) {
            case 4:
                this.bg1 = this.setBackImg("bg1");
                this.bg1.alpha = 0;
                this.bg1.tweener.clear().to({ alpha: 1 }, 200).play();
                break;
            //let hito1 = Sprite("hito1").appChldTo(this).setPosition(this.gridX.center(), this.gridY.center());

            case 8:
                this.enemy1 = this.setEnemyImg("enemy1");
                this.enemy1.scaleX -= 0.65;
                this.enemy1.scaleY -= 0.65;
                this.enemy1.alpha = 0;
                this.enemy1.tweener.clear().to({ alpha: 1 }, 200).play();
                break;

            case 10:
                this.gu = this.setGu("gu");
                this.tyo = this.setTyo("tyo");
                this.pa = this.setPa("pa");
                //タッチイベントの登録
                this.gu.setInteractive(true); this.tyo.setInteractive(true); this.pa.setInteractive(true);
                this.gu.onclick = function () {
                    //ここでthis.labelRect.textsの中身を変更したいができない
                }

                break;
        }
    },

    // 背景画像セット
    setBackImg: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.backImageGroup)
            .setPosition(this.gridX.center(), this.gridY.center());
        return img;
    },
    // 敵用画像セット
    setEnemyImg: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.enemyImageGroup)
            .setPosition(this.gridX.center() * 1 / 2, this.gridY.center());
        return img;
    },
    // ジャンケン画像セット
    setGu: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() - 30, this.gridY.center() / 4);
        img.scaleX -= 0.96;
        img.scaleY -= 0.96;
        return img;
    },
    setTyo: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() + 80, this.gridY.center() / 2 + 40);
        img.scaleX -= 0.96;
        img.scaleY -= 0.96;
        return img;
    },
    setPa: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() - 30, this.gridY.center());
        img.scaleX -= 0.96;
        img.scaleY -= 0.96;
        return img;
    },


    // onclick: function () {
    //     //次のシーンへ移動
    //     this.exit();
    // }
});


//============================================
// マネージャーシーン
//============================================
phina.define('MyManagerScene', {
    superClass: 'ManagerScene',
    init: function () {
        this.superInit({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            scenes: [
                // タイトル
                {
                    label: 'マイタイトル',
                    className: 'TitleScene',
                    nextLabel: 'マイメイン'
                },
                // メイン
                {
                    label: "マイメイン",
                    className: "MainScene",
                    nextLabel: "マイタイトル"
                }
            ]
        });
    }
});

// メイン処理
phina.main(function () {
    // アプリケーション生成
    var app = GameApp({
        startLabel: 'title', // メインシーンから開始する
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
    });
    document.body.appendChild(app.domElement);
    // app.replaceScene(MyManagerScene());
    // アプリケーション実行
    app.run();
});


/***************************************
 * テキスト表示&文字送り
 */
phina.define("LabelRect", {
    superClass: "RectangleShape",
    init: function () {
        this.superInit({
            cornerRadius: 5,
            width: 630,
            height: 280,
            stroke: "white",
            fill: "#eee"
        });
        this.alpha = 0.8;
        this.setInteractive(true);

        // テキスト表示用LabelAreaクラス
        this.labelArea = LabelArea({
            text: "",
            width: 600,
            height: 240,
            fontSize: FONT_SIZE
        }).addChildTo(this);
        this.labelArea.setInteractive(true);

        this.texts = [];
        this.textIndex = 0;
        this.charIndex = 0;

        // 次のテキスト合図の▽
        this.nextTriangle = TriangleShape({
            fill: "black",
            stroke: false,
            radius: FONT_SIZE / 2
        }).addChildTo(this)
            .setPosition(290, 60);
        this.nextTriangle.rotation = 180;
        this.nextTriangle.hide();
    },
    // 更新
    // onclick: function () {

    // },
    // update: function (app) {
    //     //クリックかEnterキーの入力があった場合
    //     //if (app.pointer.getPointingStart() || app.keyboard.getKeyDown("enter")) {
    //     if (this.onpointstart || this.labelArea.onclick) {
    //         if (this.textAll) {//テキスト全部表示済み
    //             this.nextText();
    //             // 次の背景に切替
    //             this.setPhase();
    //         } else {
    //             this.showAllText();
    //         }
    //     } else {
    //         this.addChar();
    //     }

    //     if (this.textAll) {
    //         this.nextTriangle.show();
    //     } else {
    //         this.nextTriangle.hide();
    //     }
    // },
    showAllText: function () {
        let text = this.texts[this.textIndex];
        this.labelArea.text = text;
        this.textAll = true;
        this.charIndex = text.length;
    },

    clearText: function () {
        this.labelArea.text = "";
    },

    nextText: function () {
        this.clearText();
        ++this.textIndex
        this.charIndex = 0;
        this.addChar();
    },
    addChar: function () {
        this.labelArea.text += this.getChar();
    },
    getChar: function () {
        let text = this.texts[this.textIndex];
        if (text.length <= this.charIndex) {
            this.textAll = true;
            return "";
        } else {
            this.textAll = false;
            return text[this.charIndex++];
        }
    }
});

