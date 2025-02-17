import Bismillah, { BismillahSize } from 'src/components/dls/Bismillah/Bismillah';
import React from 'react';
import PlayChapterAudioButton from 'src/components/QuranReader/PlayChapterAudioButton';
import Button, { ButtonVariant } from 'src/components/dls/Button/Button';
import ChapterIconContainer, { ChapterIconsSize } from '../ChapterIcon/ChapterIconContainer';
import styles from './ChapterHeader.module.scss';

interface Props {
  chapterId: string;
}

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9'];

const ChapterHeader: React.FC<Props> = ({ chapterId }) => (
  <div className={styles.container}>
    <div className={styles.item}>
      <ChapterIconContainer chapterId={chapterId} size={ChapterIconsSize.Large} />
    </div>
    {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
      <div className={styles.item}>
        <Bismillah size={BismillahSize.Large} />
      </div>
    )}
    <div className={styles.actionsContainer}>
      <PlayChapterAudioButton chapterId={Number(chapterId)} />
      <Button variant={ButtonVariant.Ghost} href={`/${chapterId}/info`}>
        Info
      </Button>
    </div>
  </div>
);

export default ChapterHeader;
