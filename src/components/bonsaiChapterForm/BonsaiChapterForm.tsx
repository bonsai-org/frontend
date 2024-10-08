import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './BonsaiChapterForm.module.css';
import { BonsaiChapterFile } from '../../interfaces/uploadBonsai';

function BonsaiChapterForm({
  onSubmit,
  canSkip,
  goBack,
  chapter,
  setErr
}: {
  onSubmit: (chapter: BonsaiChapterFile, destinationForm: 'chapter' | 'submit') => void;
  canSkip: boolean;
  setErr: (err: string | null) => void;
  goBack?: () => void;
  chapter?: BonsaiChapterFile;
}) {
  const [bonsaiChapter, setBonsaiChapter] = useState<BonsaiChapterFile>(
    chapter || { photos: [], caption: '', date: new Date() }
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chapter) {
      setBonsaiChapter(chapter);
    } else {
      setBonsaiChapter({ photos: [], caption: '', date: new Date() });
    }
  }, [chapter]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        setBonsaiChapter((prevChapter) => ({
          ...prevChapter,
          photos: [...prevChapter.photos, file]
        }));
      }
    }
  };

  const handleCaptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBonsaiChapter((prevChapter) => ({
      ...prevChapter,
      caption: event.target.value
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonsaiChapter((prevChapter) => ({
      ...prevChapter,
      date: new Date(event.target.value)
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setBonsaiChapter((prevChapter) => {
      const newPhotos = prevChapter.photos.filter((_, i) => i !== index);
      return { ...prevChapter, photos: newPhotos };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation checks
    if (bonsaiChapter.photos.length === 0) {
      setErr('At least one photo is required.');
      return;
    }

    if (!bonsaiChapter.caption.trim()) {
      setErr('Caption is required.');
      return;
    }

    setErr(null);
    onSubmit(bonsaiChapter, 'submit');
    // Reset the form
    setBonsaiChapter({ photos: [], caption: '', date: new Date() });
  };

  const movePhoto = (dragIndex: number, hoverIndex: number) => {
    setBonsaiChapter((prevChapter) => {
      const draggedPhoto = prevChapter.photos[dragIndex];
      const newPhotos = [...prevChapter.photos];
      newPhotos.splice(dragIndex, 1);
      newPhotos.splice(hoverIndex, 0, draggedPhoto);
      return { ...prevChapter, photos: newPhotos };
    });
  };

  const Photo = ({ photo, index }: { photo: File | null; index: number }) => {
    const [, ref] = useDrag({
      type: 'photo',
      item: { index }
    });

    const [, drop] = useDrop({
      accept: 'photo',
      hover: (item: { index: number }) => {
        if (item.index !== index) {
          movePhoto(item.index, index);
          item.index = index;
        }
      }
    });

    return (
      <div ref={(node) => ref(drop(node))} className={styles.photoContainer}>
        <img
          src={URL.createObjectURL(photo!)}
          alt={`Preview ${index}`}
          className={styles.photo}
        />
        <button
          type="button"
          onClick={() => handleRemovePhoto(index)}
          className={styles.removeBtn}
        >
          X
        </button>
      </div>
    );
  };

  const memoizedPhotos = useMemo(
    () =>
      bonsaiChapter.photos.map(
        (photo, index) =>
          photo && <Photo key={index} photo={photo} index={index} />
      ),
    [bonsaiChapter.photos]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={handleSubmit}>
        <h2>{chapter ? 'Edit Bonsai Chapter' : 'Add Bonsai Chapter'}</h2>
        <div className={styles.photoUploader}>
          <label htmlFor="photo">Photo(s):</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            ref={fileInputRef}
          />
        </div>
        <div className={styles.captionContainer}>
          <label htmlFor="caption">Caption:</label>
          <textarea
          className={styles.caption}
            id="caption"
            value={bonsaiChapter.caption}
            onChange={handleCaptionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={bonsaiChapter.date.toISOString().split('T')[0]}
            onChange={handleDateChange}
            required
          />
        </div>
        <button type="submit" className={styles.btn}>
          {chapter ? 'Save Changes' : 'Submit Chapter'}
        </button>
        <button
          className={styles.btn}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(bonsaiChapter, 'chapter');
            setBonsaiChapter({ photos: [], caption: '', date: new Date() });
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          Add New Chapter
        </button>
        {canSkip && (<button className={styles.btn} onClick={goBack}>Go to Review and Submit</button>)}
        
        <div>
          {bonsaiChapter.photos.length > 0 && (
            <div>
              <h3>Photo Preview:</h3>
              {memoizedPhotos}
            </div>
          )}
        </div>
      </form>
    </DndProvider>
  );
}

export default BonsaiChapterForm;