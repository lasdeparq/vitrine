// Aqui nós carregamos o gulp e os plugins através da função `require` do nodejs
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Definimos o diretorio dos arquivos para evitar repetição futuramente
var files = "./src/**.js";

gulp.task('clean', function(){
    return del('dist/**', {force:true});
});

gulp.task('sass', function() {
    return sass('src/scss/*.scss')
      .pipe(gulp.dest('dist/css'))
      .pipe(reload({ stream:true }));
});

//Aqui criamos uma nova tarefa através do ´gulp.task´ e damos a ela o nome 'lint'
gulp.task('lint', function() {
    // Aqui carregamos os arquivos que a gente quer rodar as tarefas com o `gulp.src`
    // E logo depois usamos o `pipe` para rodar a tarefa `jshint`
    gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Criamos outra tarefa com o nome 'dist'
gulp.task('dist', function() {
    
    // Carregamos os arquivos novamente
    // E rodamos uma tarefa para concatenação
    // Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
    // E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build/
    gulp.src(files)
    .pipe(concat('./dist'))
    .pipe(rename('/js/index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: './'
      }
    });
    
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['lint', 'dist']);
    gulp.watch(['*.html', 'dist/js/*.js'], {cwd: './'}, reload);
});