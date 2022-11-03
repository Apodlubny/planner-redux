import { Button } from "components/Button/Button";
import { StatusFilter } from "components/StatusFilter/StatusFilter";
import { TaskCounter } from "components/TaskCounter/TaskCounter";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { selectAll } from "redux/tasksSlice";
import css from "./AppBar.module.css";

export const AppBar = () => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  // кейс когда нужно пропустить первый рендер
  const isMounted = useRef(false);
  const toggleIsOn = () => setIsOn(prevState => !prevState);
  useEffect(() => {
    if (isMounted.current) {
      dispatch(selectAll(isOn));
      return;
    }
    isMounted.current = true;
  }, [dispatch, isOn]);
  return (
    <header className={css.wrapper}>
      <section className={css.section}>
        <h2 className={css.title}>Tasks</h2>
        <TaskCounter />
      </section>
      <section className={css.section}>
        <h2 className={css.title}>Actions</h2>
        <Button onClick={toggleIsOn}>
          {isOn ? "Unselect All" : "Select all"}
        </Button>
      </section>
      <section className={css.section}>
        <h2 className={css.title}>Filter by status</h2>
        <StatusFilter />
      </section>
    </header>
  );
};
