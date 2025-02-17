import classNames from 'classnames';
import React, { ChangeEvent, useEffect, RefObject } from 'react';
import useScroll from 'src/hooks/useScrollToElement';
import ComboboxItem, { DropdownItem } from '../ComboboxItem';
import ComboboxSize from '../types/ComboboxSize';
import { Value } from '../types/Values';
import styles from './ComboboxItems.module.scss';

interface Props {
  isOpened: boolean;
  isMultiSelect: boolean;
  disabled: boolean;
  preventSelecting: boolean;
  size: ComboboxSize;
  id: string;
  filteredItems: DropdownItem[];
  emptyMessage: string;
  onItemSelectedChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: Value;
}

const SCROLL_TO_SELECTED_ELEMENT_OPTIONS = {
  block: 'nearest', // 'block' relates to vertical alignment. see: https://stackoverflow.com/a/48635751/1931451 for nearest.
} as ScrollIntoViewOptions;

const ComboboxItems: React.FC<Props> = ({
  isOpened,
  disabled,
  size,
  filteredItems,
  isMultiSelect,
  preventSelecting,
  emptyMessage,
  id,
  onItemSelectedChange,
  selectedValue,
}) => {
  const [scrollToSelectedItem, selectedItemRef]: [() => void, RefObject<HTMLDivElement>] =
    useScroll(SCROLL_TO_SELECTED_ELEMENT_OPTIONS);

  // once the dropdown is opened, scroll to the selected item.
  useEffect(() => {
    if (isOpened) {
      scrollToSelectedItem();
    }
  }, [isOpened, scrollToSelectedItem]);
  return (
    <div
      className={classNames(styles.comboboxBodyContainer, {
        [styles.openedComboboxBodyContainer]: isOpened,
        [styles.largeComboboxBodyContainer]: size === ComboboxSize.Large,
      })}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.itemsContainer} role="listbox">
        {filteredItems.map((item) => {
          let checked = false;
          if (selectedValue) {
            if (!isMultiSelect && selectedValue === item.name) {
              checked = true;
            } else if (isMultiSelect && selectedValue[item.name] !== undefined) {
              checked = true;
            }
          }
          const isItemDisabled = disabled === true || item.disabled === true || preventSelecting;
          const itemId = `${id}-${item.id}`;
          return (
            <ComboboxItem
              onItemSelectedChange={onItemSelectedChange}
              key={itemId}
              checked={checked}
              disabled={isItemDisabled}
              itemId={itemId}
              selectedItemRef={selectedItemRef}
              item={item}
            />
          );
        })}
        {!filteredItems.length && (
          <ComboboxItem emptyMessage={emptyMessage} checked={false} disabled isNotFound />
        )}
      </div>
    </div>
  );
};

export default ComboboxItems;
