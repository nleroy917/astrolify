#! /bin/bash
echo "Linting...    astrolify/"
autopep8 --in-place --aggressive --recursive astrolify

echo "Linting...    horoscopes/"
autopep8 --in-place --aggressive --recursive horoscopes

echo "Linting...    language_processing/"
autopep8 --in-place --aggressive --recursive language_processing

echo "Linting...    spotify/"
autopep8 --in-place --aggressive --recursive spotify

echo "Linting...    tests/"
autopep8 --in-place --aggressive --recursive tests

echo "Verifying pep8 formatting..."
flake8 astrolify
flake8 horoscopes
flake8 language_processing
flake8 spotify
flake8 tests

echo "Done."