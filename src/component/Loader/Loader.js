import React from 'react';
import s from './Loader.module.scss';

export function Loader () {
    return (
      <div className={s.loadingBlock}>
        <div className={s.loadingItem} />
      </div>
    );
}