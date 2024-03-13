import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, act, fireEvent } from '@testing-library/react';
import LazyImage from '../components/LazyLoad';

describe('LazyImage Component', () => {
  const photo = {
    id: 1,
    src: {
      tiny: 'imageURL.jpg',
      large: 'largeImageURL.jpg',
    },
    alt: 'Image Alt',
    photographer: 'Photographer name',
  };

  const favorites = [1, 2, 3];

  const handleFavoriteClick = jest.fn();

  const capitaliseName = jest.fn();

  beforeEach(() => {
    handleFavoriteClick.mockClear();
    capitaliseName.mockClear();
  });

  it('loads the image lazily when photo.src.large is set', async () => {
    jest.spyOn(window, 'Image').mockImplementation(() => ({
      onload: null,
      set src(url) {
        setTimeout(() => {
          this.onload();
        }, 100);
      },
    }));

    const { container } = render(
      <LazyImage
        photo={photo}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
        capitaliseName={capitaliseName}
      />,
    );

    expect(container.querySelector('.fetched-photo')).toBeNull();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(container.querySelector('.fetched-photo')).not.toBeNull();
  });

  it('calls handleFavoriteClick when Favorite button is clicked', () => {
    const { getByText } = render(
      <LazyImage
        photo={photo}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
        capitaliseName={capitaliseName}
      />,
    );

    const favoriteButton = getByText('Favorite');
    fireEvent.click(favoriteButton);

    expect(handleFavoriteClick).toHaveBeenCalledTimes(1);
    expect(handleFavoriteClick).toHaveBeenCalledWith(photo.id);
  });

  it('lazy loads the image with correct props', async () => {
    const photo = {
      id: 1,
      src: {
        tiny: 'imageURL.jpg',
        large: 'largeImageURL.jpg',
      },
      alt: 'Image Alt',
      photographer: 'Photographer name',
    };

    jest.spyOn(window, 'Image').mockImplementation(() => ({
      onload: null,
      set src(url) {
        setTimeout(() => {
          this.onload();
        }, 10);
      },
    }));

    const { container } = render(
      <div style={{ height: '24rem' }}>
        <div style={{ marginTop: '16rem' }}>
          <LazyImage
            photo={photo}
            favorites={[]}
            handleFavoriteClick={() => {}}
            capitaliseName={() => {}}
          />
        </div>
      </div>,
    );

    expect(container.querySelector('.fetched-photo')).toBeNull();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20));
    });

    expect(container.querySelector('.fetched-photo')).not.toBeNull();
    expect(container.innerHTML).toContain('src="largeImageURL.jpg');
    expect(container.innerHTML).toContain('alt="Image Alt');
  });
});
