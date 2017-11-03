// Aqui nós carregamos o gulp e os plugins através da função `require` do nodejs
let gulp = require('gulp');
let jshint = require('gulp-jshint');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let del = require('del');
let livereload = require('gulp-livereload');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

// Definimos o diretorio dos arquivos para evitar repetição futuramente
var files = "src/js/*.js";

gulp.task('clean', function(){
    return del('dist/**', {force:true});
});

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(reload({ stream:true }));
});

//Aqui criamos uma nova tarefa através do ´gulp.task´ e damos a ela o nome 'lint'
gulp.task('lint', function() {
    // Aqui carregamos os arquivos que a gente quer rodar as tarefas com o `gulp.src`
    // E logo depois usamos o `pipe` para rodar a tarefa `jshint`
    gulp.src(files)
    .pipe(jshint({ esversion: 6}))
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
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(rename('/js/index.min.js'))
    .pipe(uglify().on('error', 
            function(e){
                console.log(e);
            }))
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