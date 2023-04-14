import { useState } from "react";
import styles from "@/styles/ShoeList.module.css";
type Shoe = { shoe: string; brand: string };
type Shoes = { distance: string; shoes: Shoe[] }[];
// const shoes = [
//     {
//         distance: 'Track Distance',
//         shoes: [
//             { shoe: 'ZoomX Dragonfly', brand: 'nike' },
//             { shoe: 'Air Zoom Victory', brand: 'nike' },
//             { shoe: 'Adizero Avanti TYO', brand: 'adidas' },
//             { shoe: 'FuelCell LD', brand: 'new' },
//             { shoe: 'Cielo X 2 LD', brand: 'hoka' }
//         ]
//     },
//     {
//         distance: 'Track Intervals',
//         shoes: [
//             { shoe: 'ZoomX Streakfly', brand: 'nike' },
//             { shoe: 'ZoomX Vaporfly Next% 2', brand: 'nike' },
//             { shoe: 'Adizero Takumi Sen 9', brand: 'adidas' },
//             { shoe: 'ZoomX Vaporfly 3', brand: 'nike' },
//             { shoe: 'MetaSpeed Sky', brand: 'asics' }
//         ]
//     },
//     {
//         distance: '5k/10k',
//         shoes: [
//             { shoe: 'ZoomX Vaporfly Next% 2', brand: 'nike' },
//             { shoe: 'Adizero Takumi Sen 9', brand: 'adidas' },
//             { shoe: 'ZoomX Vaporfly Next% 3', brand: 'nike' },
//             { shoe: 'MetaSpeed Sky+', brand: 'asics' },
//             { shoe: 'ZoomX Streakfly', brand: 'nike' }
//         ]
//     },
//     {
//         distance: 'Half Marathon',
//         shoes: [
//             { shoe: 'ZoomX Vaporfly Next% 3', brand: 'nike' },
//             { shoe: 'ZoomX Vaporfly Next% 2', brand: 'nike' },
//             { shoe: 'ZoomX Alphafly Next%', brand: 'nike' },
//             { shoe: 'ZoomX Alphafly Next% 2', brand: 'nike' },
//             { shoe: 'MetaSpeed Sky+', brand: 'asics' }
//         ]
//     },
//     {
//         distance: 'Marathon',
//         shoes: [
//             { shoe: 'ZoomX Alphafly Next% 2', brand: 'nike' },
//             { shoe: 'ZoomX Alphafly Next%', brand: 'nike' },
//             { shoe: 'ZoomX Vaporfly Next% 3', brand: 'nike' },
//             { shoe: 'ZoomX Vaporfly Next% 2', brand: 'nike' },
//             { shoe: 'Adizero Pro 3', brand: 'adidas' }
//         ]
//     }
// ];

export default function ShoeList({ shoes }: { shoes: Shoes }) {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [pastHalf, setPastHalf] = useState(false);
  return (
    <div
      className={` bg-wisteria-600 flex-col rounded-3xl float-left gap-4 flex p-4  place-items-center overflow-x-hidden text-white ${styles.width} `}
    >
      <h2 className="text-4xl font-bold text-center">Fastest Shoes</h2>
      <div className="flex flex-row items-center justify-center w-full gap-2">
        <button
          onClick={() => {
            if (left || right) return;
            setLeft(true);
            setTimeout(() => {
              setPastHalf(true);
            }, 500);
            setTimeout(() => {
              setLeft(false);
              setPastHalf(false);
              if (index > 0) setIndex(index - 1);
              else setIndex(shoes.length - 1);
            }, 1000);
          }}
        >
          <svg
            className="w-12 h-12 scale-150 rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p
          className={`w-64 text-4xl text-center ${
            (left || right) && styles["fade-change"]
          }`}
        >
          {
            shoes[
              pastHalf
                ? left
                  ? index > 0
                    ? index - 1
                    : shoes.length - 1
                  : index < shoes.length - 1
                  ? index + 1
                  : 0
                : index
            ].distance
          }
        </p>

        <button
          onClick={() => {
            if (left || right) return;
            setRight(true);
            setTimeout(() => {
              setPastHalf(true);
            }, 500);
            setTimeout(() => {
              setRight(false);
              setPastHalf(false);
              if (index < shoes.length - 1) setIndex(index + 1);
              else setIndex(0);
            }, 1000);
          }}
        >
          <svg
            className="w-12 h-12 scale-150 -rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          styles.display
        } gap-4 text-left text-xl w-full grid place-items-center ${
          left && styles.left
        } ${right && styles.right}`}
      >
        <ul className="flex flex-col max-w-full gap-2">
          {shoes.at(index - 1)?.shoes.map((shoe, i) => (
            <li
              className={`${styles[shoe.brand]} ${styles.shoe} truncate`}
              key={i}
            >
              {shoe.shoe}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col max-w-full gap-2">
          {shoes[index]?.shoes.map((shoe, i) => (
            <li
              className={`${styles[shoe.brand]} ${styles.shoe} truncate`}
              key={i}
            >
              {shoe.shoe}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col max-w-full gap-2">
          {shoes
            .at(index < shoes.length - 1 ? index + 1 : 0)
            ?.shoes.map((shoe, i) => (
              <li
                className={`${styles[shoe.brand]} ${styles.shoe} truncate`}
                key={i}
              >
                {shoe.shoe}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
