/* eslint-disable import/extensions */
/* eslint-disable import/no-duplicates */

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_editor.min.css";
import "froala-editor/css/froala_style.min.css";

// plugins
import "froala-editor/css/plugins/quick_insert.min.css";
import "froala-editor/css/plugins/char_counter.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/css/plugins/draggable.min.css";
import "froala-editor/css/plugins/emoticons.min.css";
import "froala-editor/css/plugins/file.min.css";
import "froala-editor/css/plugins/fullscreen.min.css";
import "froala-editor/css/plugins/help.min.css";
import "froala-editor/css/plugins/image_manager.min.css";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/plugins/line_breaker.min.css";
import "froala-editor/css/plugins/quick_insert.min.css";
import "froala-editor/css/plugins/special_characters.min.css";
import "froala-editor/css/plugins/table.min.css";
import "froala-editor/css/plugins/video.min.css";

import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { Box, Typography, CircularProgress } from '@mui/material';
import FroalaEditor from 'react-froala-wysiwyg';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const RHFFroalaEditor = ({ initializeValue = '', setValue, isFetching, readOnly }) => {
  const { control } = useFormContext();
  const FroalaKey = import.meta.env.VITE_FROALA_KEY

  // setting default value
  useEffect(() => {
    if (setValue) {
      setValue('content', initializeValue, { shouldValidate: true, shouldDirty: true });
    }
  }, [initializeValue, setValue]);

  return (
    <Controller
      name={'content'}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {isFetching ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
            </div>
          ) : (
            <Box>
              {FroalaKey && (
                <FroalaEditor
                  model={field.value}
                  onModelChange={(htmlCode) => {
                    field.onChange(htmlCode, 'emailBody');
                  }}
                  tag="textarea"
                  config={{
                    key: FroalaKey,
                    StyleSheet: {
                      borderColor: 'red',
                    },
                    events: {
                      initialized() {
                        const editor = this;
                        
                        if(readOnly) {
                          setTimeout(() => {
                            editor.edit.off();

                          },100);
                        }

                      }
                    },
                    htmlExecuteScripts: false,
                    htmlRemoveTags: ['script', 'style', 'base'],
                    disableRightClick: true,
                    // iframe: true, commented because buggy
                    attribution: false,
                    placeholder: 'Start typing...',
                    fontSizeSelection: true,
                    fontFamilySelection: true,
                    toolbarButtons: [[
                          'bold',
                          'italic',
                          'underline',
                          'strikeThrough',
                          'subscript',
                          'superscript',
                          'fontFamily',
                          'fontSize',
                          'textColor',
                          'backgroundColor',
                          'inlineClass',
                          'inlineStyle',
                          'clearFormatting',

                          'alignLeft',
                          'alignCenter',
                          'formatOLSimple',
                          'alignRight',
                          'alignJustify',
                          'formatOL',
                          'formatUL',
                          'paragraphFormat',
                          'paragraphStyle',
                          'lineHeight',
                          'outdent',
                          'indent',
                          'quote',

                          'insertLink',
                          'insertImage',
                          'insertVideo',
                          'insertTable',
                          'emoticons',
                          'fontAwesome',
                          'specialCharacters',
                          'embedly',
                          'insertFile',
                          'insertHR',

                          'undo',
                          'redo',
                          'fullscreen',
                          'print',
                          'getPDF',
                          'spellChecker',
                          'selectAll',
                          'html',
                          'help',
                          'insertHtml',
                          'fontSizeSelection'
                        ],
                      ],
                    pluginsEnabled: [
                      'table',
                      'spell',
                      'quote',
                      'save',
                      'quickInsert',
                      'paragraphFormat',
                      'paragraphStyle',
                      'help',
                      'draggable',
                      'align',
                      'link',
                      'lists',
                      'file',
                      'image',
                      'emoticons',
                      'url',
                      'video',
                      'embedly',
                      'colors',
                      'entities',
                      'inlineClass',
                      'inlineStyle',
                      'spellChecker',
                      'imageTUI',
                      'codeView',
                      'codeBeautifier',
                      'fontSize',
                      'fontFamily',
                    ],
                  }}
                />
              )}
            </Box>
          )}
          {
            readOnly ? null : 
            error && !isFetching && 
              <Typography marginLeft={2} variant="caption" color="red">
                {error.message}
              </Typography>
          }
          
        </>
      )}
    />
  );
};

export default RHFFroalaEditor;
