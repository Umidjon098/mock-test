import { createRef, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchMockData, setActive } from "../redux/slices/mock";

export function Home() {
  const myRef = createRef();
  const dispatch = useDispatch();
  const { mockData, loading, error, activeId } = useSelector(
    (state) => state.mockData,
    shallowEqual
  );

  function moveFocus(e) {
    const node = myRef.current;
    const childList = [...node.children];
    const index = childList.findIndex((item) => item.className === "active");

    if (childList.length > 1) {
      if (e.keyCode === 40 && index !== childList.length - 1) {
        dispatch(setActive(childList[index + 1].tabIndex));
      }
      if (e.keyCode === 38 && index !== 0) {
        dispatch(setActive(childList[index - 1].tabIndex));
      }
      if (index === childList.length - 1) {
        if (e.keyCode === 40) {
          dispatch(setActive(childList[0].tabIndex));
        }
      }
      if (index === 0) {
        if (e.keyCode === 38) {
          dispatch(setActive(childList[childList.length - 1].tabIndex));
        }
      }
    } else dispatch(setActive(childList[0].tabIndex));
  }

  useEffect(() => {
    dispatch(fetchMockData());
  }, []);

  return (
    <div className="App">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <h1>Posts</h1>
          <ul ref={myRef} onKeyDown={(e) => moveFocus(e)}>
            {mockData?.slice(0, 20).map((item, key) => (
              <li
                key={item.id}
                tabIndex={item.id}
                onClick={() => dispatch(setActive(item.id))}
                className={item.id === parseInt(activeId) ? "active" : ""}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
