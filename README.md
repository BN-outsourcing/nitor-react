# NITOR

<p align="center">
  <img src="https://github.com/BN-outsourcing/nitor-react/assets/96280450/50a9022a-698f-43c6-aa2d-cb476aad70e5">
</p>

## NITOR

> **개발기간** 2024.02 ~ 2024.03

<br>

## 배포주소

http://nitordesign.net/

<br>

## 프로젝트 소개

React-query와 i18next을 이용하여 다국어 웹사이트를 구축한 NITOR 웹사이트 입니다.

<br>

## 시작 가이드

### 요구사항

- Node.js 20.11.1^
- Npm 10.5.0^

```
$ npm install
$ npm start
```

<br>

## 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1716901124805?alt=media&token=a8425446-271d-451e-b707-40eab145caf9)](https://github.com/msdio/stackticon)

<br>

## 화면 구성

|                                                  메인페이지                                                  |                                                 어바웃페이지                                                 |
| :----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/BN-outsourcing/nitor-react/assets/96280450/09bd1a17-46d6-4a2c-882d-6a3550e22ab8) | ![image](https://github.com/BN-outsourcing/nitor-react/assets/96280450/515c88f9-abb2-4608-a481-13c3292837fd) |
|                                                 리스트페이지                                                 |                                                  상세페이지                                                  |
| ![image](https://github.com/BN-outsourcing/nitor-react/assets/96280450/3afe01f2-2832-4eaa-b837-00f44f96ea60) | ![image](https://github.com/BN-outsourcing/nitor-react/assets/96280450/25f44b53-1e4d-4632-b539-594704f9509b) |

<br>

## 주요 기능

### ⭐ 다국어 기능을 지원합니다

- i18next 라이브러리를 통해 다국어 기능을 지원합니다.

### ⭐ JSON 파일로 리스트를 관리합니다.

- React-query로 JSON파일과 통신하여 데이터를 비동기적으로 불러옵니다.
- id값을 이용하여 상세페이지를 화면에 불러와줍니다.

### ⭐ GSAP 을 이용하여 인터랙티브웹을 구성하였습니다.

<br>

## 아키텍쳐

```
nitor-react
├─ .eslintrc.cjs
├─ .gitattributes
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ api.json
│  ├─ favicon.ico
│  ├─ image
│  │  ├─ about
│  │  │  ├─ background.jpg
│  │  │  ├─ circle
│  │  │  │  ├─ circle01.jpg
│  │  │  │  ├─ circle02.jpg
│  │  │  │  ├─ circle03.jpg
│  │  │  │  ├─ circle04.jpg
│  │  │  │  ├─ circle05.jpg
│  │  │  │  ├─ circle06.jpg
│  │  │  │  ├─ circle07.jpg
│  │  │  │  ├─ circle08.jpg
│  │  │  │  ├─ circle09.jpg
│  │  │  │  ├─ circle10.jpg
│  │  │  │  ├─ circle11.jpg
│  │  │  │  ├─ circle12.jpg
│  │  │  │  ├─ circle13.jpg
│  │  │  │  ├─ circle14.jpg
│  │  │  │  ├─ circle15.jpg
│  │  │  │  ├─ circle16.jpg
│  │  │  │  ├─ circle17.jpg
│  │  │  │  ├─ circle18.jpg
│  │  │  │  └─ circle19.jpg
│  │  │  ├─ grid-img01.png
│  │  │  ├─ grid-img02.png
│  │  │  ├─ icon.png
│  │  │  └─ img.png
│  │  ├─ f_logo.png
│  │  ├─ icon
│  │  │  ├─ eyes.png
│  │  │  ├─ hand.png
│  │  │  ├─ light.png
│  │  │  └─ magnifying.png
│  │  ├─ logo.png
│  │  ├─ main
│  │  │  ├─ background.jpg
│  │  │  ├─ background02.jpg
│  │  │  └─ logo.png
│  │  ├─ menu
│  │  │  ├─ background-b.png
│  │  │  ├─ icon.png
│  │  │  ├─ menu-background.jpg
│  │  │  ├─ obj.png
│  │  │  ├─ obj02.png
│  │  │  ├─ obj02_w.png
│  │  │  └─ obj_w.png
│  │  ├─ og.png
│  │  └─ outwork
│  │     ├─ img02.png
│  │     └─ view
│  │        ├─ CIIE01.jpg
│  │        ├─ CIIE02.jpg
│  │        ├─ CIIE03.jpg
│  │        ├─ CIIE04.jpg
│  │        ├─ CIIE05.jpg
│  │        ├─ CIIE06.jpg
│  │        ├─ con01.jpg
│  │        ├─ con02.jpg
│  │        ├─ con03.jpg
│  │        ├─ con04.jpg
│  │        ├─ con05.jpg
│  │        ├─ con06.jpg
│  │        ├─ con07.jpg
│  │        ├─ cyto01.jpg
│  │        ├─ cyto02.jpg
│  │        ├─ cyto03.jpg
│  │        ├─ cyto04.jpg
│  │        ├─ cyto05.jpg
│  │        ├─ eats01.jpg
│  │        ├─ eats02.jpg
│  │        ├─ eats03.jpg
│  │        ├─ eats04.jpg
│  │        ├─ eats05.jpg
│  │        ├─ eats06.jpg
│  │        ├─ eats07.jpg
│  │        ├─ eats08.jpg
│  │        ├─ eats10.jpg
│  │        ├─ eats11.jpg
│  │        ├─ eats12.jpg
│  │        ├─ eats_edi_thumb.jpg
│  │        ├─ eats_thumb.jpg
│  │        ├─ FL01.jpg
│  │        ├─ FL02.jpg
│  │        ├─ FL03.jpg
│  │        ├─ FL04.jpg
│  │        ├─ FL05.jpg
│  │        ├─ FL06.jpg
│  │        ├─ FL07.jpg
│  │        ├─ GLK01.jpg
│  │        ├─ GLK02.jpg
│  │        ├─ GLK03.jpg
│  │        ├─ GLK04.jpg
│  │        ├─ GLKED01.jpg
│  │        ├─ GLKED02.jpg
│  │        ├─ GLKED03.jpg
│  │        ├─ GLKED04.jpg
│  │        ├─ HF01.jpg
│  │        ├─ HF02.jpg
│  │        ├─ HF03.jpg
│  │        ├─ HF04.jpg
│  │        ├─ HF05.jpg
│  │        ├─ HF06.jpg
│  │        ├─ MWC01.jpg
│  │        ├─ MWC02.jpg
│  │        ├─ MWC03.jpg
│  │        ├─ MWC04.jpg
│  │        ├─ MWC05.jpg
│  │        ├─ MWC06.jpg
│  │        ├─ MWC07.jpg
│  │        ├─ namdo01.jpg
│  │        ├─ namdo02.jpg
│  │        ├─ namdo03.jpg
│  │        ├─ nitor01.jpg
│  │        ├─ nitor02.jpg
│  │        ├─ nitor03.jpg
│  │        ├─ nitor04.jpg
│  │        ├─ nitor05.jpg
│  │        ├─ nitor06.jpg
│  │        ├─ nitor07.jpg
│  │        ├─ nitor08.jpg
│  │        ├─ nitor09.jpg
│  │        ├─ nitor10.jpg
│  │        ├─ nitor_edi_thumb.jpg
│  │        ├─ nitor_thumb.jpg
│  │        ├─ O201.jpg
│  │        ├─ O202.jpg
│  │        ├─ O203.jpg
│  │        ├─ O204.jpg
│  │        ├─ RX01.jpg
│  │        ├─ RX02.jpg
│  │        ├─ RX03.jpg
│  │        ├─ RX04.jpg
│  │        ├─ SB01.jpg
│  │        ├─ SB02.jpg
│  │        ├─ SB03.jpg
│  │        ├─ SB04.jpg
│  │        ├─ SB05.jpg
│  │        ├─ SB06.jpg
│  │        ├─ SB07.jpg
│  │        ├─ TF01.jpg
│  │        ├─ TF02.jpg
│  │        ├─ TF03.jpg
│  │        ├─ TF04.jpg
│  │        ├─ TF05.jpg
│  │        ├─ TF06.jpg
│  │        └─ TF07.jpg
│  └─ video
│     ├─ main01.mp4
│     ├─ main02.mp4
│     ├─ main03.mp4
│     └─ main04.mp4
├─ README.md
├─ src
│  ├─ App.tsx
│  ├─ asset
│  │  └─ font
│  │     ├─ BigDailyShort
│  │     │  ├─ BigDailyShort-Black.woff
│  │     │  ├─ BigDailyShort-Black.woff2
│  │     │  ├─ BigDailyShort-BlackItalic.woff
│  │     │  ├─ BigDailyShort-BlackItalic.woff2
│  │     │  ├─ BigDailyShort-Bold.woff
│  │     │  ├─ BigDailyShort-Bold.woff2
│  │     │  ├─ BigDailyShort-BoldItalic.woff
│  │     │  ├─ BigDailyShort-BoldItalic.woff2
│  │     │  ├─ BigDailyShort-ExtraLight.woff
│  │     │  ├─ BigDailyShort-ExtraLight.woff2
│  │     │  ├─ BigDailyShort-ExtraLightItalic.woff
│  │     │  ├─ BigDailyShort-ExtraLightItalic.woff2
│  │     │  ├─ BigDailyShort-Italic.woff
│  │     │  ├─ BigDailyShort-Italic.woff2
│  │     │  ├─ BigDailyShort-Light.woff
│  │     │  ├─ BigDailyShort-Light.woff2
│  │     │  ├─ BigDailyShort-LightItalic.woff
│  │     │  ├─ BigDailyShort-LightItalic.woff2
│  │     │  ├─ BigDailyShort-Regular.woff
│  │     │  ├─ BigDailyShort-Regular.woff2
│  │     │  ├─ BigDailyShort-SemiLight.woff
│  │     │  ├─ BigDailyShort-SemiLight.woff2
│  │     │  ├─ BigDailyShort-SemiLightItalic.woff
│  │     │  ├─ BigDailyShort-SemiLightItalic.woff2
│  │     │  ├─ demo.html
│  │     │  └─ stylesheet.css
│  │     └─ NeueHaasDisplay
│  │        ├─ demo.html
│  │        ├─ NeueHaasDisplay-Black.woff
│  │        ├─ NeueHaasDisplay-Black.woff2
│  │        ├─ NeueHaasDisplay-BlackItalic.woff
│  │        ├─ NeueHaasDisplay-BlackItalic.woff2
│  │        ├─ NeueHaasDisplay-Bold.woff
│  │        ├─ NeueHaasDisplay-Bold.woff2
│  │        ├─ NeueHaasDisplay-BoldItalic.woff
│  │        ├─ NeueHaasDisplay-BoldItalic.woff2
│  │        ├─ NeueHaasDisplay-Light.woff
│  │        ├─ NeueHaasDisplay-Light.woff2
│  │        ├─ NeueHaasDisplay-LightItalic.woff
│  │        ├─ NeueHaasDisplay-LightItalic.woff2
│  │        ├─ NeueHaasDisplay-Mediu.woff
│  │        ├─ NeueHaasDisplay-Mediu.woff2
│  │        ├─ NeueHaasDisplay-MediumItalic.woff
│  │        ├─ NeueHaasDisplay-MediumItalic.woff2
│  │        ├─ NeueHaasDisplay-Roman.woff
│  │        ├─ NeueHaasDisplay-Roman.woff2
│  │        ├─ NeueHaasDisplay-RomanItalic.woff
│  │        ├─ NeueHaasDisplay-RomanItalic.woff2
│  │        ├─ NeueHaasDisplay-Thin.woff
│  │        ├─ NeueHaasDisplay-Thin.woff2
│  │        ├─ NeueHaasDisplay-ThinItalic.woff
│  │        ├─ NeueHaasDisplay-ThinItalic.woff2
│  │        ├─ NeueHaasDisplay-XThin.woff
│  │        ├─ NeueHaasDisplay-XThin.woff2
│  │        ├─ NeueHaasDisplay-XThinItalic.woff
│  │        ├─ NeueHaasDisplay-XThinItalic.woff2
│  │        ├─ NeueHaasDisplay-XXThin.woff
│  │        ├─ NeueHaasDisplay-XXThin.woff2
│  │        ├─ NeueHaasDisplay-XXThinItalic.woff
│  │        ├─ NeueHaasDisplay-XXThinItalic.woff2
│  │        └─ stylesheet.css
│  ├─ Atom
│  │  ├─ footer.ts
│  │  ├─ header.ts
│  │  └─ tag.ts
│  ├─ components
│  │  ├─ About
│  │  │  └─ Circle.tsx
│  │  ├─ Cursor.tsx
│  │  ├─ Layout
│  │  │  ├─ ClickMenu.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ removeClickMenu.tsx
│  │  │  └─ SubLayout.tsx
│  │  ├─ Layout.tsx
│  │  ├─ List
│  │  │  └─ Tag.tsx
│  │  └─ p.ts
│  ├─ locales
│  │  ├─ en
│  │  │  └─ translation.json
│  │  ├─ i18n.ts
│  │  └─ ko
│  │     └─ translation.json
│  ├─ main.tsx
│  ├─ routes
│  │  ├─ About
│  │  │  ├─ About.tsx
│  │  │  ├─ GridLayout.tsx
│  │  │  ├─ ImbLayout.tsx
│  │  │  └─ ImgGridLayout.tsx
│  │  ├─ Main.tsx
│  │  └─ OutWork
│  │     ├─ List
│  │     │  ├─ List.tsx
│  │     │  └─ ListView.tsx
│  │     └─ View
│  │        └─ View.tsx
│  ├─ types
│  │  ├─ axiosType.ts
│  │  ├─ reactType.ts
│  │  └─ styled.ts
│  ├─ utils
│  │  ├─ APIfetch.ts
│  │  └─ gsap.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## 웹개발팀

<table>
  <tr>
    <th style="width: 200px; text-align : center;">김지유</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td>
        <img src="https://github.com/gugumo-service/gugumo_frontend/assets/96280450/d6716133-cc01-451c-af07-0da997725785">
    </td>
  </tr>
  <tr style="border-bottom: 1px solid white; text-align : center;">
    <td>FE</td>
  </tr>
</table>
