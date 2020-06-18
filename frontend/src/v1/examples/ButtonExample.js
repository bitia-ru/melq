import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import Button from '@/v1/components/Button/Button';
import { StyleSheet, css } from '@/v1/aphrodite';

const mapIndexed = R.addIndex(R.map);

const styles = StyleSheet.create({
  container: { height: 48 },
  inputContainer: { width: '100%', boxSizing: 'border-box' },
  btnContainer: { width: 203, margin: 10 },
  btnText: { marginLeft: 7 },
});

const ButtonExample = () => {
  const [btnsData, setBtnsData] = useState(
    JSON.stringify(
      [
        {
          text: 'Button (style = default)',
          tooltipText: 'Кнопка с дефолтным стилем',
          tooltipSide: 'top',
        },
        {
          text: 'Button (style = success)',
          style: 'success',
          tooltipText: 'Кнопка со стилем success',
          tooltipSide: 'top',
        },
        {
          text: 'Button (style = outlined)',
          style: 'outlined',
          tooltipText: 'Кнопка со стилем outline',
          tooltipSide: 'top',
        },
        {
          text: 'Button (style = info)',
          style: 'info',
          tooltipText: 'Кнопка со стилем info',
          tooltipSide: 'bottom',
        },
        {
          text: 'Button (waiting)',
          isWaiting: true,
          tooltipText: 'Кнопка в режиме ожидания',
          tooltipSide: 'bottom',
        },
      ],
    ),
  );

  const [btns, setBtns] = useState([]);
  const [size, setSize] = useState(null);
  const [btnBlockWidth, setBtnBlockWidth] = useState(1200);
  const [currBtnBlockWidth, setCurrBtnBlockWidth] = useState(1200);

  const update = () => {
    setBtns(JSON.parse(btnsData));
    setCurrBtnBlockWidth(parseInt(btnBlockWidth, 10));
  };

  useEffect(() => update(), []);

  const onClick = () => {
    console.log('click');
  };

  return (
    <>
      <div>
        Ширина блока:
        <input
          value={btnBlockWidth}
          type="text"
          onChange={e => setBtnBlockWidth(e.target.value)}
        />
      </div>
      <div>
        Данные кнопок:
        <input
          value={btnsData}
          className={css(styles.inputContainer)}
          onChange={e => setBtnsData(e.target.value)}
        />
      </div>
      <div>
        Размер:
        <input
          type="radio"
          id="small"
          name="size"
          value="small"
          checked={size === 'small'}
          onClick={() => setSize('small')}
        />
        <span>Small</span>
        <input
          type="radio"
          id="default"
          name="size"
          value="default"
          checked={size === null}
          onClick={() => setSize(null)}
        />
        <span>Default</span>
        <input
          type="radio"
          id="big"
          name="size"
          value="big"
          checked={size === 'big'}
          onClick={() => setSize('big')}
        />
        <span>Big</span>
      </div>
      <button type="button" onClick={update}>Обновить</button>
      <div className={css(styles.container)} style={{ width: currBtnBlockWidth }}>
        <Button
          onClick={onClick}
          size={size}
          tooltipText={R.map(btn => btn.tooltipText, btns)}
          tooltipSide={R.map(btn => btn.tooltipSide, btns)}
          disabled={R.map(btn => btn.disabled, btns)}
          btnStyle={R.map(btn => btn.style, btns)}
          isWaiting={R.map(btn => btn.isWaiting, btns)}
        >
          {
            mapIndexed(
              (btn, index) => (
                <div key={index}>{btn.text}</div>
              ),
              btns,
            )
          }
        </Button>
      </div>
      <div>Пример кнопок с контентом иконка + текст:</div>
      <div className={css(styles.btnContainer)}>
        <Button onClick={onClick} btnStyle="info" tooltipText="Назад" tooltipSide="top">
          <div>
            <svg width={16} height={15}>
              <use xlinkHref={`${require('../components/Button/images/back.svg')}#back`} />
            </svg>
            <span className={css(styles.btnText)}>Вернуться назад</span>
          </div>
        </Button>
      </div>
      <div className={css(styles.btnContainer)}>
        <Button onClick={onClick} tooltipText="Редактировать">
          <div>
            <svg width={16} height={16}>
              <use xlinkHref={`${require('../components/Button/images/edit.svg')}#edit`} />
            </svg>
            <span className={css(styles.btnText)}>Редактировать</span>
          </div>
        </Button>
      </div>
    </>
  );
};

export default ButtonExample;
