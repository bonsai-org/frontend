import React from 'react';
import styles from '../bonsaiSubmitForm/BonsaSubmitForm.module.css';

interface BonsaiData {
  hardiness_zone: string;
  height: number | '';
  width: number | '';
  nebari: number | '';
  style: string;
  species: string;
}

interface BonsaiChapter {
  photos: (File | null)[];
  caption: string;
  date: Date;
}

interface BonsaiSubmitFormProps {
  bonsaiData: BonsaiData;
  bonsaiChapterArr: BonsaiChapter[];
  onAddNewChapter: () => void;
  onEditData: () => void;
  onEditChapter: (index: number) => void;
  onDiscardBonsai: () => void;
  onSubmitBonsai: () => void;
  onDeleteChapter: (index: number) => void;
}

const BonsaiSubmitForm: React.FC<BonsaiSubmitFormProps> = ({
  bonsaiData,
  bonsaiChapterArr,
  onAddNewChapter,
  onEditData,
  onEditChapter,
  onDiscardBonsai,
  onSubmitBonsai,
  onDeleteChapter
}) => {
  return (
    <div className={styles.container}>
      <h2>Bonsai Data</h2>
      <div>
        <strong>Hardiness Zone:</strong> {bonsaiData.hardiness_zone}
      </div>
      <div>
        <strong>Height:</strong> {bonsaiData.height}
      </div>
      <div>
        <strong>Width:</strong> {bonsaiData.width}
      </div>
      <div>
        <strong>Nebari:</strong> {bonsaiData.nebari}
      </div>
      <div>
        <strong>Style:</strong> {bonsaiData.style}
      </div>
      <div>
        <strong>Species:</strong> {bonsaiData.species}
      </div>
      <button className={styles.btn} onClick={onEditData}>
        Edit Bonsai Data
      </button>
      <hr />
      <h2>Bonsai Chapters</h2>
      {bonsaiChapterArr.map((chapter, index) => (
        <>
          {chapter.photos[0] && (
            <div key={index} className={styles.chapterContainer}>
              <img
                className={styles.chapterImg}
                src={URL.createObjectURL(chapter.photos[0]!)}
                alt={`Chapter ${index + 1}`}
              />
              <div className={styles.chapBtnContainer}>
                <button
                  className={styles.btn}
                  onClick={() => onEditChapter(index)}
                >
                  Edit
                </button>
                <button
                  className={styles.btn}
                  onClick={() => onDeleteChapter(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      ))}
      <button className={styles.btn} onClick={onAddNewChapter}>
        Add New Chapter
      </button>
      <hr />
      <button className={styles.btn} onClick={onDiscardBonsai}>
        Discard Bonsai
      </button>
      <button className={styles.btn} onClick={onSubmitBonsai}>
        Submit Bonsai
      </button>
      <hr />
    </div>
  );
};

export default BonsaiSubmitForm;
