import './../App.css';
import React from 'react';
import Header from './Margins/Header';
import Nav from './Margins/ProjectNav';
import Video from './Component/Video';
import ProjectPres from './Component/ProjectPres';
import Link from './Component/Link';

function Body( {page} ) {
  return (
    <body>
      <ProjectPres name={`${page}`} text="Cuddle est une librairie écrite en C visant à manipuler des données structurées issues de fichiers CSV, à la manière de la bibliothèque Pandas en Python. Le but était de créer une librairie statique complète (libcuddle.a) permettant de charger, transformer, analyser et exporter efficacement des données, tout en mettant l'accent sur la performance, la flexibilité, et la qualité de conception en langage bas niveau."/>
      <div className='Section' id="functionality">
        <h2>Fonctionnalités clés</h2>
          <ul>
            <li>Lecture et écriture de fichiers CSV avec séparateur personnalisable</li>
            <li>Stockage des données dans une structure dataframe_t optimisée</li>
            <li>Détection et gestion dynamique des types (int, float, bool, string)</li>
            <li>Fonctions d’analyse : head, tail, shape, info, describe</li>
            <li>Filtres conditionnels, tris personnalisés, transformations de colonnes</li>
            <li>Agrégation de données (groupby + fonctions personnalisées)</li>
            <li>Conversion dynamique des types (ex : string → int)</li>
            <li>Fonctions apply() pour transformation ligne à ligne</li>
            <li>Extraction de valeurs uniques, accès par index, typage flexible</li>
            <li>Support de grandes volumétries de données</li> 
          </ul>
      </div>
      <div className='Section' id="directskill">
        <h2>Compétences mises en pratique</h2>
          <ul>
            <li>Parsing structuré de fichiers CSV</li>
            <li>Structures de données dynamiques</li>
            <li>API modulaire sous forme de librairie statique</li>
            <li>Gestion mémoire avancée, typage, polymorphisme bas niveau</li>
            <li>Fonctions génériques avec pointeurs typés</li>
            <li>Tests unitaires et documentation technique</li>
          </ul>
      </div>
      <div className='Section' id="demo">
          <h2>Démo</h2>
          <ul className='demo_cuddle'>
          <li><strong>CSV Handling</strong>
            <ul>
              <li><code>df_read_csv(filename, separator)</code> – Read a CSV file into a dataframe.</li>
              <li><code>df_write_csv(dataframe, filename)</code> – Write a dataframe back to a CSV file.</li>
            </ul>
          </li>
          <li><strong>Data Exploration</strong>
            <ul>
              <li><code>df_head(dataframe, n)</code> – Return the first <code>n</code> rows.</li>
              <li><code>df_tail(dataframe, n)</code> – Return the last <code>n</code> rows.</li>
              <li><code>df_shape(dataframe)</code> – Return number of rows and columns.</li>
              <li><code>df_info(dataframe)</code> – Print column names and types.</li>
              <li><code>df_describe(dataframe)</code> – Summary statistics for numerical columns.</li>
            </ul>
          </li>

          <li><strong>Filtering and Selection</strong>
            <ul>
              <li><code>df_filter(dataframe, column, filter_func)</code> – Return a new dataframe with rows that satisfy a condition.</li>
              <li><code>df_get_value(dataframe, row, column)</code> – Get a single value.</li>
              <li><code>df_get_values(dataframe, column)</code> – Get all values in a column.</li>
              <li><code>df_get_unique_values(dataframe, column)</code> – Get unique values in a column.</li>
            </ul>
          </li>

          <li><strong>Sorting and Grouping</strong>
            <ul>
              <li><code>df_sort(dataframe, column, sort_func)</code> – Sort rows based on a column and a custom comparison function.</li>
              <li><code>df_groupby(dataframe, group_column, target_columns, agg_func)</code> – Group by a column and aggregate one or more columns.</li>
            </ul>
          </li>

          <li><strong>Transformation</strong>
            <ul>
              <li><code>df_apply(dataframe, column, apply_func)</code> – Apply a function to transform all values in a column.</li>
              <li><code>df_to_type(dataframe, column, column_type)</code> – Convert a column to a different data type.</li>
            </ul>
          </li>

          <li><strong>Memory Management</strong>
            <ul>
              <li><code>df_free(dataframe)</code> – Free all memory associated with the dataframe.</li>
            </ul>
          </li>

          <li><strong>Supported Data Types (via <code>column_type_t</code>)</strong>
            <ul>
              <li><code>STRING</code></li>
              <li><code>INT</code></li>
              <li><code>UINT</code></li>
              <li><code>FLOAT</code></li>
              <li><code>BOOL</code></li>
              <li><code>UNDEFINED</code> (used internally before detection)</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='Section' id="link">
        <h2>Liens</h2>
        <div className='Section_body'>
          <div className='contributor'>
            <a>Contributor : </a>
            <Link.Philibert />
            <Link.Pierrick />
          </div>
        </div>
      </div>
    </body>
  );
}

function Cuddle() {
  return (
    <React.StrictMode>
      <Header Title={"Cuddle - Duo (2 semaines)"} SubTitle={"C · mars 2025 - mars 2025"}/>
      <Nav page="Cuddle"/>
      <Body page="Cuddle"/>
    </React.StrictMode>
  );
}

export default Cuddle;