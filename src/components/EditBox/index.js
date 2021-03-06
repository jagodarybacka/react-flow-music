import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { Edit } from 'icons';
import './styles.scss';

export default function EditBox({ label, content, onClick }) {
  return (
    <div className="EditBox">
      <span className="EditBox__label">{label}</span>
      <div className="EditBox__content">
        <span className="EditBox__content-text" title={content}>{content}</span>
        <Icon onClick={onClick} render={() => <Edit />} />
      </div>
    </div>
  );
}

EditBox.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  content: PropTypes.string
};
