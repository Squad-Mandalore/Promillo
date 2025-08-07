# Promillo Cook Book

## Idea

1. Einleitung (Ole)
   - ziele
   - funktionswise
   - warum
2. technische beschreibung (Moritz)
   - input/output (blackbox)
   - warum welche komponente notwendig und wofür
   - beschreiben der funktionen
3. how to let beetz cook (Ben)
   - anleitung für abschreiben
   - bzw selbst aufsetzen

## Building

Just run `arara main` inside this directory

## Contribution

### Install latex

<details>
  <summary>Linux</summary>

  1. `cd /tmp` # working directory of your choice
  2. `wget https://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz`
  3. `zcat < install-tl-unx.tar.gz | tar xf -` # note final - on that command line
  5. `cd install-tl-2*`
  4. `cp /path/to/this/repo/texlive.profile ./`
  6. `perl ./install-tl -profile texlive.profile`
  7. `echo "export PATH=$HOME/texlive/2025/bin/x86_64-linux:\$PATH" >> ~/.bashrc`

  - [Official Quickinstall](https://www.tug.org/texlive/quickinstall.html)
  - [Official Guide](https://www.tug.org/texlive/doc/texlive-en/texlive-en.html#x1-140003)
</details>
<details>
  <summary>MacOS</summary>

  - [Official MacTex Help](https://tug.org/mactex/mactex-download.html)
  - [Official Guide](https://www.tug.org/texlive/doc/texlive-en/texlive-en.html#x1-140003)
</details>
<details>
  <summary>Windows</summary>

  1. Download https://mirror.ctan.org/systems/texlive/tlnet/install-tl-windows.exe
  2. Execute the newly-downloaded install-tl-windows.exe.
  3. Change settings as desired and install.

  - [Official Windows Help](https://www.tug.org/texlive/windows.html)
  - [Official Guide](https://www.tug.org/texlive/doc/texlive-en/texlive-en.html#x1-140003)
</details>
